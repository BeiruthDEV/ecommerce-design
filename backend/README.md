# Backend

API FastAPI do mini e-commerce academico.

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

No Linux/Mac:

```bash
source venv/bin/activate
```

A API fica em `http://localhost:8000` e a documentacao interativa em `http://localhost:8000/docs`.
