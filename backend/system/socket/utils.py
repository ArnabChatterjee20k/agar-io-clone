import hashlib, random, math ,uuid
from ..models import Player


def get_unique_color_by_sid(sid):
    hash_value = int(hashlib.md5((sid.encode())).hexdigest(), 16)
    hue = hash_value % 360
    return f"hsl({hue}, 50%, 50%)"


def calculate_ping():
    return


def dump_player_details(sid, id, room_id, username=""):
    color = get_unique_color_by_sid(sid)
    x = random.random() * 500
    y = random.random() * 500
    # TODO: calculate ping
    ping = calculate_ping()
    player_details = Player(
        player_id=id,
        sid=sid,
        room_id=room_id,
        username="",
        color=color,
        position={"x": x, "y": y},
    )
    return player_details


def get_velocity(angle, speed=1):
    y_direction = math.sin(angle) * speed
    x_direction = math.cos(angle) * speed
    return x_direction, y_direction


def get_random_id():
    return uuid.uuid4().hex