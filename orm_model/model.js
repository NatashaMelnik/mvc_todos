// const knex = require('./knexconf');
// const sequelize = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('army_bd', 'postgres', 'qazpoi', {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        timestamps: false
    }
});

const lists = sequelize.define("lists", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const tasks = sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    list_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

sequelize.sync().then(result => console.log(132))
    .catch(err => {
        console.log('err');
        console.log(err);
    });

// lists.hasMany(tasks); // set norm sv

class ListTodos {

    displayAll(listId) {
        console.log('in display all');
        return tasks.findAll({ where: { name: "task1" }, raw: true })
            .then(res => {
                console.log(res);
            }).catch(err => console.log(err));
    }


}

function getToday() {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function clean(obj) {
    for (let i = 0; i < obj.length; i++) {
        for (let propName in obj[i]) {
            if (obj[i][propName] === null || obj[i][propName].length === 0) {
                delete obj[i][propName];
            }
        }
    }
    return obj;
}
const List_orm = new ListTodos();

module.exports = List_orm;
