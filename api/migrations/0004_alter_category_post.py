# Generated by Django 4.1.2 on 2022-10-12 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_category_description_alter_category_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='post',
            field=models.ManyToManyField(blank=True, to='api.post'),
        ),
    ]