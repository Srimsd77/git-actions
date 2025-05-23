# Generated by Django 5.2 on 2025-05-03 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_line_1', models.CharField(max_length=255)),
                ('address_line_2', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('pin_code', models.CharField(max_length=10)),
            ],
        ),
    ]
