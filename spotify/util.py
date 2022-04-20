from tkinter.messagebox import NO
from . models import SpotifyToken

def get_user_token(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None    

def update_or_create_token(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_token(session_id)
    expires_in= 3600
    