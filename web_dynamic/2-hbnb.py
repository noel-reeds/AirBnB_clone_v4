#!/usr/bin/python3
""" Starts a Flask Web Application """
import uuid
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
from flasgger import  Swagger
from flasgger.utils import swag_from
from api.v1.views import app_views

app = Flask(__name__)
app.config['SWAGGER'] = {
    'uiversion': 3
}
app.register_blueprint(app_views)
swagger = Swagger(app)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/2-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('2-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           cached_id=uuid.uuid4(),
                           places=places)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
