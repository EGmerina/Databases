const GRAPHQL_URL = import.meta.env.VITE_API_URL ?? '/graphql/';

type GraphQLError = {
  message: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export type FreelancerCard = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
  skills: string[];
  shortDescription: string;
};

export type PortfolioAlbum = {
  albumId: number;
  title: string;
  description: string;
  fileLinks: string[];
  creationDate: string;
};

export type FreelancerProfile = FreelancerCard & {
  portfolio: PortfolioAlbum[];
};

export type OrderCard = {
  id: number;
  title: string;
  description: string;
  requiredSkills: string[];
  expectedPayment: number;
  deadline: string;
  publicationDate: string;
  employerName: string;
  employerDescription: string;
};

export type ContractCard = {
  contractId: number;
  status: string;
  paymentAmount: number;
  deadline: string;
  conclusionDate: string;
  employerName: string;
  orderTitle: string;
  employerRating: number | null;
  freelancerRating: number | null;
};

export type HomeStats = {
  freelancerCount: number;
  orderCount: number;
  topFreelancers: FreelancerCard[];
};

export type CurrentUser = {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  freelancerId: number | null;
  employerId: number | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  skills?: string;
  description?: string;
};

type FreelancerNode = {
  freelancerId: string;
  skills: string;
  description: string;
  user: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
};

type AuthPayloadNode = {
  freelancerId: string | null;
  employerId: string | null;
  user: {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
};

type PortfolioNode = {
  albumId: string;
  title: string;
  description: string | null;
  creationDate: string;
  fileLinks: unknown;
};

type OrderNode = {
  orderId: string;
  title: string;
  description: string;
  requiredSkills: string;
  expectedPayment: string;
  deadline: string;
  publicationDate: string;
  employer: {
    description: string;
    user: {
      fullName: string;
    };
  };
};

type ContractNode = {
  contractId: string;
  status: string;
  paymentAmount: string;
  deadline: string;
  conclusionDate: string;
  employerRating: number | null;
  freelancerRating: number | null;
  order: {
    title: string;
    employer: {
      user: {
        fullName: string;
      };
    };
  };
};

function splitSkills(skills: string) {
  return skills
    .split(/[,;\n]/)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function truncate(text: string, maxLength = 140) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function ensureStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function mapFreelancer(node: FreelancerNode): FreelancerCard {
  const skills = splitSkills(node.skills);

  return {
    id: Number(node.freelancerId),
    fullName: node.user.fullName,
    email: node.user.email,
    phoneNumber: node.user.phoneNumber,
    description: node.description,
    skills,
    shortDescription: truncate(node.description),
  };
}

function mapPortfolio(node: PortfolioNode): PortfolioAlbum {
  return {
    albumId: Number(node.albumId),
    title: node.title,
    description: node.description ?? 'Описание не указано.',
    creationDate: node.creationDate,
    fileLinks: ensureStringArray(node.fileLinks),
  };
}

function mapOrder(node: OrderNode): OrderCard {
  return {
    id: Number(node.orderId),
    title: node.title,
    description: node.description,
    requiredSkills: splitSkills(node.requiredSkills),
    expectedPayment: Number(node.expectedPayment),
    deadline: node.deadline,
    publicationDate: node.publicationDate,
    employerName: node.employer.user.fullName,
    employerDescription: node.employer.description,
  };
}

function mapContract(node: ContractNode): ContractCard {
  return {
    contractId: Number(node.contractId),
    status: node.status,
    paymentAmount: Number(node.paymentAmount),
    deadline: node.deadline,
    conclusionDate: node.conclusionDate,
    employerName: node.order.employer.user.fullName,
    orderTitle: node.order.title,
    employerRating: node.employerRating,
    freelancerRating: node.freelancerRating,
  };
}

function mapCurrentUser(node: AuthPayloadNode): CurrentUser {
  return {
    userId: Number(node.user.userId),
    fullName: node.user.fullName,
    email: node.user.email,
    phoneNumber: node.user.phoneNumber,
    freelancerId: node.freelancerId === null ? null : Number(node.freelancerId),
    employerId: node.employerId === null ? null : Number(node.employerId),
  };
}

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(', '));
  }

  if (!payload.data) {
    throw new Error('Backend returned no data');
  }

  return payload.data;
}

export async function fetchFreelancers() {
  const data = await graphqlRequest<{
    allFreelancers: FreelancerNode[];
  }>(`
    query FreelancersList {
      allFreelancers {
        freelancerId
        skills
        description
        user {
          fullName
          email
          phoneNumber
        }
      }
    }
  `);

  return data.allFreelancers.map(mapFreelancer);
}

export async function login(input: LoginInput) {
  const data = await graphqlRequest<{
    login: AuthPayloadNode;
  }>(
    `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          freelancerId
          employerId
          user {
            userId
            fullName
            email
            phoneNumber
          }
        }
      }
    `,
    input,
  );

  return mapCurrentUser(data.login);
}

export async function register(input: RegisterInput) {
  const data = await graphqlRequest<{
    register: AuthPayloadNode;
  }>(
    `
      mutation Register(
        $fullName: String!
        $email: String!
        $phoneNumber: String!
        $password: String!
        $skills: String! = ""
        $description: String! = ""
      ) {
        register(
          fullName: $fullName
          email: $email
          phoneNumber: $phoneNumber
          password: $password
          skills: $skills
          description: $description
        ) {
          freelancerId
          employerId
          user {
            userId
            fullName
            email
            phoneNumber
          }
        }
      }
    `,
    {
      ...input,
      skills: input.skills ?? '',
      description: input.description ?? '',
    },
  );

  return mapCurrentUser(data.register);
}

export async function fetchCurrentUser(userId: number) {
  const data = await graphqlRequest<{
    currentUser: AuthPayloadNode | null;
  }>(
    `
      query CurrentUser($userId: Int!) {
        currentUser(userId: $userId) {
          freelancerId
          employerId
          user {
            userId
            fullName
            email
            phoneNumber
          }
        }
      }
    `,
    { userId },
  );

  return data.currentUser ? mapCurrentUser(data.currentUser) : null;
}

export async function fetchFreelancerProfile(id: number) {
  const data = await graphqlRequest<{
    freelancerById: FreelancerNode | null;
    freelancerPortfolio: PortfolioNode[];
  }>(
    `
      query FreelancerProfile($id: Int!) {
        freelancerById(id: $id) {
          freelancerId
          skills
          description
          user {
            fullName
            email
            phoneNumber
          }
        }
        freelancerPortfolio(freelancerId: $id) {
          albumId
          title
          description
          creationDate
          fileLinks
        }
      }
    `,
    { id },
  );

  if (!data.freelancerById) {
    return null;
  }

  return {
    ...mapFreelancer(data.freelancerById),
    portfolio: data.freelancerPortfolio.map(mapPortfolio),
  } satisfies FreelancerProfile;
}

export async function fetchOrders() {
  const data = await graphqlRequest<{
    allOrders: OrderNode[];
  }>(`
    query OrdersList {
      allOrders {
        orderId
        title
        description
        requiredSkills
        expectedPayment
        deadline
        publicationDate
        employer {
          description
          user {
            fullName
          }
        }
      }
    }
  `);

  return data.allOrders.map(mapOrder);
}

export async function createOrderResponse(orderId: number, title: string, freelancerId: number) {
  const data = await graphqlRequest<{
    createResponse: {
      responseId: string;
    };
  }>(
    `
      mutation CreateResponse($freelancerId: Int!, $orderId: Int!, $title: String!) {
        createResponse(freelancerId: $freelancerId, orderId: $orderId, title: $title) {
          responseId
        }
      }
    `,
    { freelancerId, orderId, title },
  );

  return Number(data.createResponse.responseId);
}

export async function fetchMyProfileData(freelancerId: number) {
  const data = await graphqlRequest<{
    freelancerById: FreelancerNode | null;
    freelancerPortfolio: PortfolioNode[];
    freelancerContracts: ContractNode[];
  }>(
    `
      query MyProfile($freelancerId: Int!) {
        freelancerById(id: $freelancerId) {
          freelancerId
          skills
          description
          user {
            fullName
            email
            phoneNumber
          }
        }
        freelancerPortfolio(freelancerId: $freelancerId) {
          albumId
          title
          description
          creationDate
          fileLinks
        }
        freelancerContracts(freelancerId: $freelancerId) {
          contractId
          status
          paymentAmount
          deadline
          conclusionDate
          employerRating
          freelancerRating
          order {
            title
            employer {
              user {
                fullName
              }
            }
          }
        }
      }
    `,
    { freelancerId },
  );

  if (!data.freelancerById) {
    return null;
  }

  return {
    freelancerId,
    profile: mapFreelancer(data.freelancerById),
    portfolio: data.freelancerPortfolio.map(mapPortfolio),
    contracts: data.freelancerContracts.map(mapContract),
  };
}

export async function fetchHomeStats() {
  const [freelancers, orders] = await Promise.all([fetchFreelancers(), fetchOrders()]);

  return {
    freelancerCount: freelancers.length,
    orderCount: orders.length,
    topFreelancers: freelancers.slice(0, 4),
  } satisfies HomeStats;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}
