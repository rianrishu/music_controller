# Generated by Django 4.0.3 on 2022-05-19 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0003_alter_spotifytoken_refresh_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(default='AQCg7b66sBZW1p_idPqf81Ag6-A0tI-J2fd9QvHR0jMO3zxVEAZHAtKCtiuWvIJVYprAFwv5b65gnfKHlYa9mmzhnMtU_EhEBoLDQJRw1Y0fRCmsk7NPEH8tBC-4STI57zo', max_length=150, null=True),
        ),
    ]
