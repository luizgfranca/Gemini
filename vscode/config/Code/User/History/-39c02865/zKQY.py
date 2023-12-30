class StaticContentUser(locust.HttpUser):
    @locust.task
    def test_static_content(self):
        self.client.post('/pessoas', '{"apelido" : "josé","nome" : "José Roberto","nascimento" : "2000-10-01","stack" : ["C#", "Node", "Oracle"]')
}')