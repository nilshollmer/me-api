$(> db/me.sqlite)
cat db/migrate.sql | sqlite3 db/me.sqlite
cat db/seed.sql | sqlite3 db/me.sqlite
