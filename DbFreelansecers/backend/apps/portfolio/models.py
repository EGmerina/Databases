from django.db import models

class Portfolio(models.Model):
    album_id = models.AutoField(primary_key=True)
    # Один фрилансер может иметь много альбомов в портфолио
    freelancer = models.ForeignKey('users.Freelancer', on_delete=models.CASCADE, related_name='portfolios')
    
    title = models.CharField(max_length=255, verbose_name="Название работы/альбома")
    description = models.TextField(null=True, blank=True, verbose_name="Описание")
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    
    # Храним список ссылок в виде JSON, например: ["https://link.com/img1.jpg", "https://link.com/img2.jpg"]
    file_links = models.JSONField(default=list, verbose_name="Ссылки на файлы")

    def __str__(self):
        return f"Портфолио: {self.title} (ID: {self.album_id})"

    class Meta:
        db_table = "portfolios"
