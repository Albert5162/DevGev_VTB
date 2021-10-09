# GevDev_VTB

## Запуск

- Установить [Docker](https://www.docker.com/get-started)
- Открыть терминал
- Клонировать репозиторий
    
    ```bash
       git clone <https://github.com/Albert5162/DevGev_VTB.git>
    ```
    
- Перейти в папку репозитория
    
    ```bash
      cd DevGev_VTB
    ```
    
- Запустить проект
    
    ```bash
      docker-compose up -d
    ```
    
- Дождаться запуска и перейти по ссылке [GevDev](http://localhost:5000/)

## Backend ./Backend
<details>
<summary>dataProviders</summary>
<p>
В папке ./Providers хранятся файлы предоставляющие доступ к данным. Только в этих файлах можно обращаться к БД.

**Структура файла:**

```jsx
//Подключение к колекции mongodb
const link = global.con.collection('collection');

module.exports = {
    async f_name(args) {
        return link
    },
    ....
}
```

При запуске приложения все файлы парсятся в единый глобальный объект dbProvider.

**Структура dbProvider:**

```jsx
{
  meta_datasets: {
    addInfo: [AsyncFunction: addInfo],
    getShowcase: [AsyncFunction: getShowcase],
    getByURN: [AsyncFunction: getByURN]
  },
  user: {
    updateSessionToken: [AsyncFunction: updateSessionToken],
    getByToken: [AsyncFunction: getByToken],
    getByLogin: [AsyncFunction: getByLogin],
    createSession: [AsyncFunction: createSession],
    generatePassword: [Function: generatePassword],
    generateSalt: [Function: generateSalt],
    genPassword: [AsyncFunction: genPassword],
    checkPassword: [AsyncFunction: checkPassword],
    addUser: [AsyncFunction: addUser]
  }
}
```

В любом месте приложения можно обратиться к объекту dbProvider.

**Пример использования:**

```jsx
dbProvider.user.getByToken("")
```
</p>
</details>

<details>
<summary>graphQL</summary>
<p>
В папке ./Types размещены файлы описывающие GraphQLObjectType.

**Структура файла:** 

```jsx
const {GraphQLObjectType} = require('graphql')

module.exports.type = new GraphQLObjectType({
    name: "Type",
    description: "Description",
    fields: () => ({
        field: { type: GraphQLType},
})

module.exports.resolve = async (parent, args) => {
  return date
}
```

В папке ./Mutations размещены файлы описывающие GraphQLObjectType.

**Структура файла:** 

```jsx
const {GraphQLString, GraphQLID, GraphQLObjectType, GraphQLNonNull, GraphQLList} = require('graphql');

module.exports.type = GraphQLString
module.exports.args = {
    arg1: {type: new GraphQLNonNull(GraphQLID)},
    arg2: {type: new GraphQLNonNull(GraphQLID)},
}
module.exports.resolve = async (parent = {}, args, {state: {user}}) => {
    //преобразоване данных
    return data
}
```

Далее файл ./shema.js формирует конечный GraphQLSchema объект на основе файлов в папках.

GraphQL запросы принимаются по конечному пути /graphql (требуется авторизация)
</p>
</details>
<details>
<summary>lib</summary>
<p>
Содержит в себе служебные файлы.

Подключение к БД а так же настройка стратегий авторизации.
</p>
</details>
<details>
<summary>routs</summary>
<p>
Данный каталог содержит в себе файлы для формирования REST API использую библиотеку "@koa/router"

**Структура файла:**

```jsx
const Router = require('@koa/router');
const router = new Router();

router.post("/route", async ctx => {
})

router.get("/route", async ctx => {

})

module.exports = router
```
</p>
</details>

### index.js

Данный файл является отправной точкой для сборки проекта.

В данном файле запускаются все службы проекта и настраивается HTTP сервер на базе "koa"

Все файлы из папки ./routs требуется подключить в ручную методом добавления middleware

Пример:

```jsx
app.use(require('./routs/file').routes());
```

### Аутентификация

На сервере работает аутентификация пользователей методом "HTTP Bearer authentication"

Все пароль проходят крипто шифрования и сохраняются в БД в виде шифра.

Не авторизированный пользователь имеет доступ только к конечным точкам /sign_in и /registration



# DSL

## Пример создания выборки с использованием нескольких датасетов

### Создание трех промежуточных датасетов и их взаимодействие

Создание первого датасета: объединение нескольких датасетов из разных директорий в один датасет.

Создание второго датасета: создание нового столбца с преобразованием типа значения из другого столбца.

Создание третьего датасета: операция JOIN второго и первого датасетов.

![Untitled](https://i.ibb.co/qgTbv3V/Untitled.png)

### Раскрытие вложенных документов

Демонстрируется "расширение" датасета "в высоту".

![Untitled](https://i.ibb.co/3k67HDL/Untitled-1.png)

### Фильтрация

Создание четвертого датасета: получение нового датасета из директории, затем JOIN с третим датасетом, после чего происходят фильтрация и другие преобразования.

![Untitled](https://i.ibb.co/m4B3NyB/Untitled-2.png)

### Получение выборки

В конечном итоге получаем выборку (семпл) из четвертого — последнего собранного — датасета по условиям (размер, начальное случайное значени и т.д.).

![Untitled](https://i.ibb.co/RvCZK9t/Untitled-3.png)

## Пример запроса

Объявляем наш первый инструментальный датасет. 

```json
{
    "first-dataset": [
```

Собираем 3 датасета из двух директорий.

```json
        {
            "$aggregate": {
                "datasets": {
                    "0": "Albert5162/directory-one/store_one",
                    "1": "Albert5162/directory-one/store_two",
                    "2": "Albert5162/directory-two/store_three"
                },
```

Соединяем по трем столбцам; названия двух столбцов отличаются в датасетах — нужно присвоить им одно название. Третий столбец "location" соединяет датасеты в "скрытом" виде (во всех трех датасетах у столбца одно и то же название).

```json
                "merge": {
                    "store_id": ["0.index", "1.store_id", "2.store_id"],
                    "total": ["0.total", "1.maintenance", "2.total_cost"],
                    "$keep_others": true
                },
```

Оставляем только те столбцы, по котором происходило соединение датасетов.

```json
                "drop_unmerged": true
            }
        }
    ],
```

Во втором инструментальном датасете создаем новый столбец — значения из одного столбца, но в другом типе данных.

```json
        {
            "$attach": {
                "store_id": {
                    "$to_int": "inventory_id_str"
                }
            }
        }
```

Третий инструментальный датасет создается на основе второго.

```json
    "third-dataset": [
        {
            "$from": "second-dataset"
        },
```

Делаем JOIN с первым датасетом.

```json
        {
            "$right_join": {
                "dataset": "first-dataset",
                "local_field": "store_id",
                "foreign_field": "store_id"
            }
        },
```

Раскрываем вложенный документ (поле "employees") — аналогично $unwind в MongoDB — но вместо массива вложенных документов с одним документом преобразовывается все поле, включая название ключа, где значение — вложенный документ.

```json
        {
            "$split": {
                "by": "employees",
                "as": "employee"
            }
        },
```

В четвертом инструментальном датасете используется фильтрация. Фильтрация делится на две части (или только вторую, если необходимо): первая — объявление временных полей, которые нужны для фильтрации (но сами поля не остаются в датасете — они используются только в фильтрации, после чего исчезают), а вторая — сами условия.

```json
        {
            "$filter": {
                "assume": {
                    "median_pay": {
                        "$multiply": ["median_time_worked", "paid_per_hour"]
                    },
                    "score": {
                        "$divide": ["median_pay", "age"]
                    }
                },
                "conditions": [
                    {
                        "age": {
                            "$gte": 25
                        },
                        "median_pay": {
                            "$gte": 22.5
                        },
                        "score": {
                            "$lt": 3
                        }
                    }
                ]
            }
        },
```

Пример индексации — использования -1 для получения последнего документа в массиве.

```json
        {
            "$attach": {
                "last_item_sold": "items_sold.-1"
            }
        }
```

Получение конечной выборки из четвертого (конечного) инструментального датасета: указываем размер выборки, можно ли брать один и тот же документ несколько раз, а так же начальное случайное значение — чтобы была возможность получить точно такую же выборку (например, если сама выборка понравилась или чтобы в дальнейшем была возможность репликации результатов).

```json
    "$sample": {
        "from": "fourth-dataset",
        "size": 30,
        "replacement": false,
        "seed": 56456123586095823459
    }
}
```

Полный запрос.

```json
{
    "first-dataset": [
        {
            "$aggregate": {
                "datasets": {
                    "0": "Albert5162/directory-one/store_one",
                    "1": "Albert5162/directory-one/store_two",
                    "2": "Albert5162/directory-two/store_three"
                },
                "merge": {
                    "store_id": ["0.index", "1.store_id", "2.store_id"],
                    "total": ["0.total", "1.maintenance", "2.total_cost"],
                    "$keep_others": true
                },
                "drop_unmerged": true
            }
        }
    ],
    "second-dataset": [
        {
            "$aggregate": {
                "datasets": {
                    "0": "Albert5162/inventory"
                }
            }
        },
        {
            "$attach": {
                "store_id": {
                    "$to_int": "inventory_id_str"
                }
            }
        }
    ],
    "third-dataset": [
        {
            "$from": "second-dataset"
        },
        {
            "$right_join": {
                "dataset": "first-dataset",
                "local_field": "store_id",
                "foreign_field": "store_id"
            }
        },
        {
            "$attach": {
                "value": {
                    "$multiply": ["count", "price"]
                }
            }
        },
        {
            "$split": {
                "by": "employees",
                "as": "employee"
            }
        },
        {
            "$attach": {
                "median_time_worked": {
                    "$median": "employee.hours"
                }
            }
        }
    ],
    "fourth-dataset": [
        {
            "$aggregate": {
                "datasets": {
                    "0": "Albert5162/staff/personal_data"
                }
            }
        },
        {
            "$inner_join": {
                "dataset": "third-dataset",
                "local_field": "id",
                "foreign_field": "employee.id"
            }
        },
        {
            "$filter": {
                "assume": {
                    "median_pay": {
                        "$multiply": ["median_time_worked", "paid_per_hour"]
                    },
                    "score": {
                        "$divide": ["median_pay", "age"]
                    }
                },
                "conditions": [
                    {
                        "age": {
                            "$gte": 25
                        },
                        "median_pay": {
                            "$gte": 22.5
                        },
                        "score": {
                            "$lt": 3
                        }
                    }
                ]
            }
        },
        {
            "$attach": {
                "last_item_sold": "items_sold.-1"
            }
        }
    ],
    "$sample": {
        "from": "fourth-dataset",
        "size": 30,
        "replacement": false,
        "seed": 56456123586095823459
    }
}
```
