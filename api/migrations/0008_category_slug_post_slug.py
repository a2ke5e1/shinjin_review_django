# Generated by Django 4.1.2 on 2022-10-13 05:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_post_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.CharField(default='', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.CharField(default='', max_length=255, null=True),
        ),
    ]
