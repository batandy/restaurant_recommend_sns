"""
ASGI config for wbsite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
#깃허브 commit test
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wbsite.settings')

application = get_asgi_application()

