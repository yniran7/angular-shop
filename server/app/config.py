class Config:
    def __init__(self):
        pass
    
    def get_db_url(self):
        return 'mongodb://localhost:27017'
    
    def get_host(self):
        return '0.0.0.0'
    
    def get_port(self):
        return 5000