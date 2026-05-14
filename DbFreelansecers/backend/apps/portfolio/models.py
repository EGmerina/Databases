from django.db import models

class Portfolio(models.Model):
    album_id = models.AutoField(primary_key=True)
  
    freelancer = models.ForeignKey('users.Freelancer', on_delete=models.CASCADE, related_name='portfolios')
    
    title = models.CharField(max_length=255, verbose_name="Название работы/альбома")
    description = models.TextField(null=True, blank=True, verbose_name="Описание")
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    
    file_links = models.JSONField(default=list, verbose_name="Ссылки на файлы")

    def __str__(self):
        return f"Портфолио: {self.title} (ID: {self.album_id})"

    class Meta:
        managed = False
        db_table = "portfolios"
