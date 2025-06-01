from api import app, db, migrate


@app.shell_context_processor
def make_shell_context():
    return {"app": app,
            "db": db,
            "migrate": migrate
            }

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")