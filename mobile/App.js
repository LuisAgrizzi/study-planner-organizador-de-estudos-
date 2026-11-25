// Importa o controle da barra superior do celular
import { StatusBar } from 'expo-status-bar';

// Importa a ferramenta para guardar e atualizar informações no app
import { useState } from 'react';

// Importa componentes da tela, campos de texto e ferramentas de estilo
import { TextInput, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Tarefas de exemplo exibidas quando o aplicativo é aberto
const tasks = [
  {
    id: '1',
    name: 'Lista de exercícios - funções',
    subject: 'Matemática',
    date: 'Hoje',
    completed: false,
  },
  {
    id: '2',
    name: 'Revisar capítulo 3',
    subject: 'Biologia',
    date: 'Amanhã',
    completed: false,
  },
];
// Componente principal: monta a tela do aplicativo
export default function App() {
  // Guarda a lista de tarefas e permite atualizá-la
  const [taskList, setTaskList] = useState(tasks);
  // Controla se o formulário de nova tarefa aparece na tela
  const [showForm, setShowForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  // Guarda o aviso quando algum campo obrigatório estiver vazio
  const [formError, setFormError] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  // Adiciona ou atualiza a tarefa, depois limpa e fecha o formulário
  const handleAddTask = () => {
    if (newTaskName && newTaskSubject && newTaskDate) {
      setFormError('');
      if (editingTaskId) {
        setTaskList((currentTasks) =>
          currentTasks.map((task) =>
            task.id === editingTaskId
              ? {
                ...task,
                name: newTaskName,
                subject: newTaskSubject,
                date: newTaskDate,
              }
              : task
          )
        );
      } else {
        const newTask = {
          id: Date.now().toString(),
          name: newTaskName,
          subject: newTaskSubject,
          date: newTaskDate,
          completed: false,
        };
        setTaskList((currentTasks) => [...currentTasks, newTask]);
      }

      setNewTaskName('');
      setNewTaskSubject('');
      setNewTaskDate('');
      setEditingTaskId(null);
      setShowForm(false);
    }
    else {
      setFormError('Por favor, preencha todos os campos.');
    }
  };
  const handleDeleteTask = (taskId) => {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };
  const handleEditTask = (task) => {
    setNewTaskName(task.name);
    setNewTaskSubject(task.subject);
    setNewTaskDate(task.date);
    setEditingTaskId(task.id);
    setFormError('');
    setShowForm(true);
  };
  // Conta as tarefas cuja data foi digitada exatamente como "Hoje"
  const taskTodayCount = taskList.filter(task => task.date === 'Hoje').length;
  // Cria uma lista de matérias sem nomes repetidos
  const subjectList = [...new Set(taskList.map((task) => task.subject))];
  const filteredTasks = taskList.filter((task) => {
    if (taskFilter === 'pending') return !task.completed;
    if (taskFilter === 'completed') return task.completed;
    return true;
  });
  return (
    // Área rolável que contém o conteúdo da tela
    <ScrollView contentContainerStyle={styles.container}>

      {/* Título do aplicativo */}
      <Text style={styles.title}>Organizador de estudos!</Text>
      {/* Caixa verde que resume as tarefas do dia */}
      <View style={styles.summaryCard}>
        {/* Explica o que o número representa */}
        <Text style={styles.summaryLabel}>Tarefas para hoje</Text>
        {/* Mostra o número de tarefas */}
        <Text style={styles.summaryNumber}>
          {taskTodayCount} {taskTodayCount === 1 ? 'tarefa' : 'tarefas'}
        </Text>
      </View>

      {/* Título da seção de matérias */}
      <Text style={styles.sectionTitle}>Minhas matérias</Text>
      {/* Caixa para cada matéria */}
      {subjectList.map((subject) => {
        // Conta as tarefas desta matéria que ainda estão pendentes
        const pendingCount = taskList.filter(
          (task) => task.subject === subject && !task.completed
        ).length;

        return (
          <View key={subject} style={styles.subjectCard}>
            <Text style={styles.subjectName}>{subject}</Text>
            <Text style={styles.subjectInfo}>Pendentes: {pendingCount}</Text>
          </View>
        );
      })}

      {/* Título da lista de tarefas */}
      <Text style={styles.sectionTitle}>Próximas tarefas</Text>

      {/* Botão para abrir ou fechar o formulário */}
      <Pressable style={styles.formButton} onPress={() => setShowForm(!showForm)}>
        <Text style={styles.formButtonText}>Adicionar tarefa</Text>
      </Pressable>
      {/* Exibe os três campos quando o formulário está aberto */}
      {showForm && (
        <View>
          <TextInput style={styles.taskInput}
            placeholder="Digite o nome da nova tarefa"
            value={newTaskName}
            onChangeText={setNewTaskName}
          />
          <TextInput style={styles.taskInput}
            placeholder="Matéria"
            value={newTaskSubject}
            onChangeText={setNewTaskSubject}
          />
          <TextInput style={styles.taskInput}
            placeholder="Data"
            value={newTaskDate}
            onChangeText={setNewTaskDate}
          />
          {formError !== '' && (
            <Text style={styles.formErrorText}>{formError}</Text>
          )}
          {/*Botão para salvar a tarefa*/}
          <Pressable style={styles.formButton} onPress={handleAddTask}>
            <Text style={styles.formButtonText}>
              {editingTaskId ? 'Atualizar tarefa' : 'Salvar tarefa'}
            </Text>
          </Pressable>
        </View>
      )}

      {/* Filtros das tarefas */}
      <View style={styles.filterRow}>
        <Pressable
          style={[
            styles.filterButton,
            taskFilter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setTaskFilter('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              taskFilter === 'all' && styles.filterButtonTextActive,
            ]}
          >
            Todas
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            taskFilter === 'pending' && styles.filterButtonActive,
          ]}
          onPress={() => setTaskFilter('pending')}
        >
          <Text
            style={[
              styles.filterButtonText,
              taskFilter === 'pending' && styles.filterButtonTextActive,
            ]}
          >
            Pendentes
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            taskFilter === 'completed' && styles.filterButtonActive,
          ]}
          onPress={() => setTaskFilter('completed')}
        >
          <Text
            style={[
              styles.filterButtonText,
              taskFilter === 'completed' && styles.filterButtonTextActive,
            ]}
          >
            Concluídas
          </Text>
        </Pressable>
      </View>

      {/* Lista de tarefas */}
      {filteredTasks.map((task) => (
        <View key={task.id} style={styles.taskCard}>
          <Pressable
            style={[styles.taskCheck, task.completed && styles.taskCheckCompleted]}
            onPress={() => {
              setTaskList((currentTasks) =>
                currentTasks.map((item) =>
                  item.id === task.id
                    ? { ...item, completed: !item.completed }
                    : item
                )
              );
            }}
          >
            {task.completed && (<Text style={styles.taskCheckText}>✓</Text>)}
          </Pressable>
          <View style={styles.taskInfo}>
            <Text style={[styles.taskName, task.completed && styles.taskNameCompleted]}>
              {task.name}
            </Text>
            <Text style={styles.taskMeta}>
              {task.subject} - {task.date}
            </Text>
            <Pressable
              style={styles.editButton}
              onPress={() => handleEditTask(task)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(task.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {/* Configura a aparência da barra de status do celular */}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Guarda os estilos usados pelos elementos acima
const styles = StyleSheet.create({
  // Aparência do título principal
  title: {
    color: '#20221F', // cor do texto
    fontSize: 28,      // tamanho da letra
    fontWeight: '700',  // deixa a letra em negrito
    marginBottom: 20,   // espaço abaixo do título
  },
  // Aparência da caixa de resumo
  summaryCard: {
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    backgroundColor: '#466C52', // cor de fundo verde
    borderRadius: 16, // cantos arredondados
    padding: 20, // espaço interno da caixa
    marginBottom: 8, // espaço abaixo da caixa
    alignItems: 'center', // centraliza o conteúdo horizontalmente
  },
  summaryLabel: {
    color: '#E7EFE8', // cor do texto
    fontSize: 14, // tamanho da letra
  },
  summaryNumber: {
    color: '#FFFFFF', // cor do texto
    fontSize: 24, //  tamanho da letra
    fontWeight: '700', // deixa a letra em negrito
    marginTop: 8, //  espaço acima do número
  },
  sectionTitle: {
    color: '#20221F', // cor do texto
    fontSize: 20, // tamanho da letra
    fontWeight: '700', // deixa a letra em negrito
    marginTop: 28, // espaço acima do título
    marginBottom: 12, //  espaço abaixo do título
  },
  // Aparência do cartão de cada matéria
  subjectCard: {
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    backgroundColor: '#FFFFFF', // cor de fundo branca
    borderRadius: 16, // cantos arredondados
    padding: 16, // espaço interno da caixa
    marginBottom: 8, // espaço abaixo da caixa
  },
  // Aparência do nome da matéria
  subjectName: {
    color: '#20221F', // cor do texto
    fontSize: 18, //tamanho da letra
    fontWeight: '700', //deixa em negrito
  },
  // Aparência da contagem de tarefas pendentes da matéria
  subjectInfo: {
    color: '#777A72', // cor do texto
    fontSize: 14, // tamanho da letra
    marginTop: 6, // espaço acima do texto
  },
  // Aparência do campo de entrada de nova tarefa
  taskInput: {
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    backgroundColor: '#FFFFFF', // cor de fundo branca
    borderWidth: 1, // espessura da borda
    borderColor: '#D8DDD8', // cor da borda
    borderRadius: 16, // cantos arredondados
    padding: 14, // espaço interno da caixa
    marginBottom: 10, // espaço abaixo da caixa 

  },
  // Aparência dos botões do formulário
  formButton: {
    backgroundColor: '#466C52', // cor de fundo verde
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    borderRadius: 16, // cantos arredondados
    padding: 14, // espaço interno da caixa
    marginBottom: 10, // espaço abaixo da caixa
    alignItems: 'center', // centraliza o conteúdo horizontalmente
  },
  // Aparência do texto dentro dos botões do formulário
  formButtonText: {
    color: '#FFFFFF', // cor do texto
    fontSize: 16, // tamanho da letra
    fontWeight: '700', // deixa em negrito
  },
  formErrorText: {
    color: '#FF0000', // cor do texto vermelho para indicar erro
    fontSize: 14, // tamanho da letra
    marginBottom: 10, // espaço abaixo do texto de erro
  },
  // Organiza os botões de filtro em uma linha
  filterRow: {
    width: '90%',
    maxWidth: 520,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  // Aparência de cada botão de filtro
  filterButton: {
    width: '32%',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#E7EFE8',
    alignItems: 'center',
  },
  // Fundo do filtro selecionado
  filterButtonActive: {
    backgroundColor: '#466C52',
  },
  // Texto normal dos filtros
  filterButtonText: {
    color: '#466C52',
    fontSize: 14,
    fontWeight: '700',
  },
  // Texto branco do filtro selecionado
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  // Aparência do botão para editar a tarefa
  editButton: {
    marginTop: 8,
    backgroundColor: '#466C52',
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  // Aparência do botão de exclusão da tarefa
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#B42318', // cor de fundo vermelha
    alignSelf: 'flex-end', // alinha o botão à direita
    paddingVertical: 6, // espaço interno vertical
    paddingHorizontal: 12, // espaço interno horizontal
    borderRadius: 8, // cantos arredondados
  },
  // Aparência do texto dentro do botão de exclusão
  deleteButtonText: {
    color: '#FFFFFF', // cor do texto branca
    fontSize: 14, // tamanho da letra
    fontWeight: '700', // deixa em negrito
  },

  // Aparência da caixa de tarefa
  taskCard: {
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    backgroundColor: '#FFFFFF', // cor de fundo branca
    borderRadius: 16, // cantos arredondados
    padding: 16, // espaço interno da caixa
    marginBottom: 8, // espaço abaixo da caixa
    flexDirection: 'row', // disposição horizontal dos elementos
    alignItems: 'center', // centraliza os elementos verticalmente
  },
  // Organiza as informações ao lado do círculo
  taskInfo: {
    flex: 1,
  },
  // Aparência do nome da tarefa
  taskName: {
    color: '#20221F', // cor do texto
    fontSize: 16, // tamanho da letra
    fontWeight: '700', // deixa em negrito
  },
  // Aparência do nome quando a tarefa está concluída
  taskNameCompleted: {
    color: '#777A72',
    textDecorationLine: 'line-through',
  },
  // Aparência do texto com a matéria e a data da tarefa
  taskMeta: {
    color: '#777A72', // cor do texto
    fontSize: 14, // tamanho da letra
    marginTop: 4, // espaço acima do texto
  },
  // Aparência do círculo de verificação
  taskCheck: {
    width: 24, // largura do círculo
    height: 24, // altura do círculo
    borderRadius: 12, // torna o círculo redondo
    borderWidth: 2, // espessura da borda
    borderColor: '#466C52', // cor da borda
    marginRight: 12, // espaço à direita do círculo
    alignItems: 'center', // centraliza o conteúdo horizontalmente
    justifyContent: 'center', // centraliza o conteúdo verticalmente
  },
  // Aparência do círculo de verificação quando a tarefa está concluída
  taskCheckCompleted: {
    backgroundColor: '#466C52', // cor de fundo verde quando concluído
  },
  // Aparência do texto de verificação
  taskCheckText: {
    color: '#ffffff', // cor do texto
    fontSize: 14, // tamanho da letra
    fontWeight: '700', // deixa em negrito
  },
  // Aparência do conteúdo dentro da tela rolável
  container: {
    flexGrow: 1, // preenche a tela e cresce com o conteúdo
    backgroundColor: '#fff', // cor de fundo branca
    paddingTop: 40, //espaço acima do conteúdo
    paddingBottom: 32, // espaço depois do conteúdo
    alignItems: 'center', // centraliza o conteúdo horizontalmente
    justifyContent: 'flex-start', // começa o conteúdo no topo
  },
});
