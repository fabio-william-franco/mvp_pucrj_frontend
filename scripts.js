
const API_BASE_URL = 'http://127.0.0.1:5000'
/*
  --------------------------------------------------------------------------------------
  Obter a lista de trabalhadores do servidor via requisição GET.
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = `${API_BASE_URL}/trabalhadores`;
    fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            data.trabalhadores.forEach(item => insertList(item.nome, item.especialidades))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


getList()

/*
  --------------------------------------------------------------------------------------
  Enviar os dados de um novo trabalhador para o servidor via requisição POST.
  --------------------------------------------------------------------------------------
*/

const postItem = async (inputNome, inputEspecialidadesNomes) => {
    let url = `${API_BASE_URL}/trabalhador`;

    
    const formData = new FormData();
    formData.append('nome', inputNome); 
    inputEspecialidadesNomes.forEach(especialidade => {
        formData.append('especialidades_nomes', especialidade); 
    });

    
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {
                insertList(data.nome, data.especialidades);
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
};


/*
  --------------------------------------------------------------------------------------
  Adicionar um novo trabalhador ao sistema.
  --------------------------------------------------------------------------------------
*/

const newItem = () => {
    const inputNome = document.getElementById("newInput").value.trim();
    const inputEspecialidades = document.getElementById("newEspecialidades").value;

    
    const especialidadesNomes = inputEspecialidades.split(',').map(e => e.trim());

    if (!inputNome || especialidadesNomes.length === 0 || especialidadesNomes[0] === "") {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    
    postItem(inputNome, especialidadesNomes);

    
    document.getElementById('form-trabalhadores').reset();
};


/*
  --------------------------------------------------------------------------------------
  Inserir os dados de um trabalhador na tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, especialidades) => {
    const table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = nome;
    cell2.innerHTML = especialidades.map(e => e.nome).join(', '); // Mostrar os nomes das especialidades
    cell3.innerHTML = `<button onclick="deleteItem('${nome}')">Deletar</button>`;
};



/*
  --------------------------------------------------------------------------------------
  Remover um trabalhador do servidor via requisição DELETE.
  --------------------------------------------------------------------------------------
*/
const deleteItem = (nome) => {
    let url = `${API_BASE_URL}/trabalhador?nome=${encodeURIComponent(nome)}`;
    fetch(url, {
        method: 'delete',
    })
        .then((response) => response.json())
        .then((data) => {
            removeItemFromTable(nome);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*
  --------------------------------------------------------------------------------------
  Remover visualmente um trabalhador da tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const removeItemFromTable = (nome) => {
    const table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerHTML === nome) {
            table.deleteRow(i);
            break;
        }
    }
}

/*
  --------------------------------------------------------------------------------------
  Obter a lista de tarefas do servidor via requisição GET.
  --------------------------------------------------------------------------------------
*/
const getTasks = async () => {
    let url = `${API_BASE_URL}/tarefas`;
    fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            data.tarefas.forEach(task => {
                insertTaskList(task.nome, task.especialidade.nome);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar tarefas:', error);
        });
};

getTasks();


/*
  --------------------------------------------------------------------------------------
  Enviar os dados de uma nova tarefa para o servidor via requisição POST.
  --------------------------------------------------------------------------------------
*/
const postTask = async (inputTaskName, inputEspecialidadeId) => {
    let url = `${API_BASE_URL}/tarefa`;

    const formData = new FormData();
    formData.append('nome', inputTaskName); 
    formData.append('especialidade_id', inputEspecialidadeId); 

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {

                insertTaskList(data.nome, data.especialidade.nome);
            }
        })
        .catch((error) => {
            console.error('Erro ao adicionar tarefa:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Adicionar uma nova tarefa ao sistema.
  --------------------------------------------------------------------------------------
*/

const newTask = () => {
    const inputTaskName = document.getElementById("newTaskInput").value.trim();
    const inputEspecialidadeId = document.getElementById("newTaskEspecialidade").value;

    if (!inputTaskName || !inputEspecialidadeId) {
        alert("Por favor, preencha o nome da tarefa e selecione uma especialidade.");
        return;
    }

    postTask(inputTaskName, inputEspecialidadeId);
    
    document.getElementById('form-tarefas').reset();
};

/*
  --------------------------------------------------------------------------------------
  Inserir os dados de uma tarefa na tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const insertTaskList = (taskName, especialidadeName) => {
    const table = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0); 
    const cell2 = newRow.insertCell(1); 
    const cell3 = newRow.insertCell(2); 

    cell1.innerHTML = taskName; 
    cell2.innerHTML = especialidadeName; 
    cell3.innerHTML = `<button onclick="deleteTask('${taskName}')">Deletar</button>`;
};


/*
  --------------------------------------------------------------------------------------
  Remover uma tarefa do servidor via requisição DELETE.
  --------------------------------------------------------------------------------------
*/
const deleteTask = (taskName) => {
    let url = `${API_BASE_URL}/tarefa?nome=${encodeURIComponent(taskName)}`;
    fetch(url, {
        method: 'delete',
    })
        .then((response) => response.json())
        .then((data) => {
            removeTaskFromTable(taskName);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Remover visualmente uma tarefa da tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const removeTaskFromTable = (taskName) => {
    const table = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerHTML === taskName) {
            table.deleteRow(i);
            break;
        }
    }
};

/*
  --------------------------------------------------------------------------------------
  Obter a lista de custos associados às tarefas e trabalhadores via requisição GET.
  --------------------------------------------------------------------------------------
*/
const getCosts = async () => {
    let url = `${API_BASE_URL}/custos`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.custos.forEach(cost => {
                insertCostList(cost.trabalhador, cost.tarefa, cost.custo, cost.id);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar custos:', error);
        });
};


/*
  --------------------------------------------------------------------------------------
  Inserir os dados de custo na tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const insertCostList = (workerName, taskName, costValue, costId) => {
    const table = document.getElementById("costTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = workerName;
    cell2.innerHTML = taskName;
    cell3.innerHTML = costValue;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.setAttribute("data-cost-id", costId); 
    deleteButton.onclick = () => deleteCost(costId); 
    cell4.appendChild(deleteButton);
};


getCosts();


/*
  --------------------------------------------------------------------------------------
  Enviar os dados de um novo custo para o servidor via requisição POST.
  --------------------------------------------------------------------------------------
*/
const postCost = async (workerId, taskId, costValue) => {
    const formData = new FormData();
    formData.append('trabalhador_id', workerId);
    formData.append('tarefa_id', taskId);
    formData.append('custo', costValue);

    let url = `${API_BASE_URL}/custo`;
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            insertCostList(data.trabalhador_id, data.tarefa_id, data.custo);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Adicionar um novo custo ao sistema.
  --------------------------------------------------------------------------------------
*/
const newCost = () => {
    const workerId = document.getElementById("workerSelect").value;
    const taskId = document.getElementById("taskSelect").value;
    const costValue = document.getElementById("costValue").value;

    if (!workerId || !taskId || !costValue) {
        alert("Preencha todos os campos.");
        return;
    }

    const formData = new FormData();
    formData.append('trabalhador_id', workerId);
    formData.append('tarefa_id', taskId);
    formData.append('custo', costValue);

    fetch(`${API_BASE_URL}/custo`, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            insertCostList(data.trabalhador, data.tarefa, data.custo);
        })
        .catch((error) => {
            console.error('Erro ao adicionar custo:', error);
        });

    document.getElementById('form-custos').reset();
};


/*
  --------------------------------------------------------------------------------------
  Remover um custo do servidor via requisição DELETE.
  --------------------------------------------------------------------------------------
*/
const deleteCost = (costId) => {
    if (!costId) {
        console.error("ID inválido para exclusão do custo:", costId);
        return;
    }

    const url = `${API_BASE_URL}/custo?id=${costId}`;

    fetch(url, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição DELETE: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.message) {
                alert(data.message);
            }
            removeCostFromTable(costId);
        })
        .catch((error) => {
            console.error('Erro ao deletar custo:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Remover visualmente um custo da tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const removeCostFromTable = (costId) => {
    const table = document.getElementById("costTable").getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        const deleteButton = table.rows[i].cells[3].querySelector("button");

        
        const buttonCostId = deleteButton.getAttribute("data-cost-id");

        
        if (buttonCostId == costId) {
            table.deleteRow(i); 
            break;
        }
    }
};

/*
  --------------------------------------------------------------------------------------
  Carregar as especialidades do servidor e preencher os campos correspondentes no formulário.
  --------------------------------------------------------------------------------------
*/

const loadEspecialidades = async (selectId = "newEspecialidades") => {
    let url = `${API_BASE_URL}/especialidades`;
    fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            const select = document.getElementById(selectId);

            
            select.innerHTML = '<option value="" disabled selected>Selecione uma Especialidade</option>';

           
            data.especialidades.forEach(especialidade => {
                const option = document.createElement("option");
                option.value = especialidade.id; 
                option.textContent = especialidade.nome; 
                select.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};


loadEspecialidades();

loadEspecialidades("newTaskEspecialidade");


/*
  --------------------------------------------------------------------------------------
  Carregar os trabalhadores do servidor e preencher os campos correspondentes no formulário.
  --------------------------------------------------------------------------------------
*/

const loadWorkers = async () => {
    let url = `${API_BASE_URL}/trabalhadores`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const select = document.getElementById("workerSelect");
            data.trabalhadores.forEach(worker => {
                const option = document.createElement("option");
                option.value = worker.id;
                option.textContent = worker.nome;
                select.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar trabalhadores:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Carregar as tarefas do servidor e preencher os campos correspondentes no formulário.
  --------------------------------------------------------------------------------------
*/
const loadTasks = async () => {
    let url = `${API_BASE_URL}/tarefas`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const select = document.getElementById("taskSelect");
            data.tarefas.forEach(task => {
                const option = document.createElement("option");
                option.value = task.id;
                option.textContent = task.nome;
                select.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar tarefas:', error);
        });
};


loadWorkers();
loadTasks();

/*
  --------------------------------------------------------------------------------------
  Carregar as atribuições de tarefas e trabalhadores do servidor.
  --------------------------------------------------------------------------------------
*/
const loadAssignments = async () => {
    let url = `${API_BASE_URL}/atribuicoes_detalhadas`;
    fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {

            const table = document.getElementById("assignmentsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = '';

  
            data.atribuicoes.forEach(atribuicao => {
                insertAssignmentList(atribuicao.trabalhador, atribuicao.tarefa, atribuicao.custo);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar atribuições:', error);
        });
};


loadAssignments();

/*
  --------------------------------------------------------------------------------------
  Processar as atribuições de tarefas e trabalhadores.
  --------------------------------------------------------------------------------------
*/
const processAssignments = async () => {
    let url = `${API_BASE_URL}/process_assignments`;
    fetch(url, {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => {
            
            const table = document.getElementById("assignmentsTable").getElementsByTagName('tbody')[0];
            table.innerHTML = '';

           
            data.atribuicoes.forEach(atribuicao => {
                insertAssignmentList(atribuicao.trabalhador, atribuicao.tarefa, atribuicao.custo);
            });
        })
        .catch((error) => {
            console.error('Erro ao processar atribuições:', error);
        });
};

/*
  --------------------------------------------------------------------------------------
  Inserir uma atribuição de trabalhador e tarefa na tabela de exibição.
  --------------------------------------------------------------------------------------
*/
const insertAssignmentList = (workerName, taskName, costValue) => {
    const table = document.getElementById("assignmentsTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = workerName;
    cell2.innerHTML = taskName;
    cell3.innerHTML = costValue;
};

