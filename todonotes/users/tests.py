from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from users.views import UserCustomViewSet
from users.models import User
from todo.models import Project
from todo.models import Todo

class TestUserViewSet(TestCase):
    def setUp(self)->None:
        self.name = 'admin'
        self.password = 'admin_123'
        self.email = 'admin_123@mail.ru'
        self.data = {'username':'Sergey', 'first_name':'Sergey', 'last_name':'Sergeev', 'email':'Sergeev@mail.ru'}
        self.data_put = {'username': 'Nikolay', 'first_name': 'Nikolay', 'last_name': 'Nikoleev', 'email': 'Nikoleev@mail.ru'}
        self.url = '/api/users/'
    def test_get_list(self):
        factory = APIRequestFactory()

        request = factory.get(self.url)
        view = UserCustomViewSet.as_view({'get':'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_create_user(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self)->None:
        pass


class TestTodoViewSet(APITestCase):
    def setUp(self)->None:
        self.name = 'admin'
        self.password = '123'
        self.email = 'admin_123@mail.ru'
        self.data_project = {'name':'Project1', 'url':'http://ozon.ru'}
        self.project = Project.objects.create(**self.data_project)
        self.data_user = {'username': 'Nikolay', 'first_name': 'Nikolay', 'last_name': 'Nikoleev', 'email': 'Nikoleev@mail.ru'}
        self.user = User.objects.create(**self.data_user)
        self.data = {'project':self.project, 'text':'New', 'user':self.user, 'active':True}
        self.data_put = {'project':self.project, 'text':'updated', 'user':self.user, 'active':True}
        self.url = '/api/todos/'
    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        todo = Todo.objects.create(**self.data)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'text':'updated'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_ = Todo.objects.get(id=todo.id)
        self.assertEqual(todo_.text, 'updated')
        self.client.logout()
    def tearDown(self)->None:
        pass