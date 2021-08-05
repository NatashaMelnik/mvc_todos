const { Client } = require('pg');
const config = require('./config');

class ListTodos {

    async checkTaskExistence(listId, id) {
        const client = new Client(config);
        client.connect();
        return client.query('SELECT * FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1 and tasks.id=$2', [+listId, +id])
            .then(data => {
                if (data.rows.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
    }

    async displayAll(listId) {
        const client = new Client(config);
        client.connect();
        let list = await client.query('SELECT tasks.id, name, done FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1', [+listId]);
        return this.clean(list.rows);
    }

    async displaySingle(listId, id) {
        return this.checkTaskExistence(listId, id)
            .then(condition => {
                if (condition) {
                    const client = new Client(config);
                    return client.query('SELECT tasks.id, name FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1 and tasks.id=$2', [+listId, +id])
                        .then((data) => {
                            return data.rows[0];
                        });
                }
            });
    }

    async addTask(listId, body) {
        const client = new Client(config);
        client.connect();
        return client.query('INSERT INTO public.tasks(id, name, list_id) VALUES (default, $1, $2);', [body.name, +listId])
    }

    async updateTask(listId, id, body) {
        return this.checkTaskExistence(listId, id)
            .then((condition) => {
                if (condition) {
                    const client = new Client(config);
                    client.connect();
                    if (typeof body.done === "boolean") {
                        return client.query('UPDATE public.tasks SET done=$1 WHERE tasks.id=$2;', [body.done, +body.id])
                    }
                }
            });
    }

    rewriteTask(listId, id, body) {
        return this.checkTaskExistence(listId, id)
            .then((condition) => {
                if (condition) {
                    const client = new Client(config);
                    client.connect();
                    if (body.name) {
                        if (typeof body.done === "boolean") {
                            return client.query('UPDATE public.tasks SET done=$1, name=$2 WHERE tasks.id=$3', [body.done, body.name, +body.id])
                        }
                    }
                }
            });
    }

    deleteTask(listId, taskId) {
        return this.checkTaskExistence(listId, +taskId)
            .then((condition) => {
                if (condition) {
                    const client = new Client(config);
                    client.connect();
                    if (+taskId) {
                        return client.query('DELETE FROM public.tasks WHERE tasks.id=$1;', [+taskId])
                    }
                }
            })
    }

    clean(obj) {
        for (let i = 0; i < obj.length; i++) {
            for (let propName in obj[i]) {
                if (obj[i][propName] === null || obj[i][propName].length === 0) {
                    delete obj[i][propName];
                }
            }
        }
        return obj;
    }
}

const List = new ListTodos();

module.exports = List;
