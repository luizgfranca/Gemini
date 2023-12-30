class StaticContentUser(locust.HttpUser):
    @locust.task
    def test_static_content(self):
        self.client.get('/test.html')
        self.client.get('/alice.txt')