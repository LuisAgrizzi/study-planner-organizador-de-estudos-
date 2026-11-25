// Importa o controle da barra superior do celular
import { StatusBar } from 'expo-status-bar';

// Importa a ferramenta para guardar e atualizar informações no app
import { useState } from 'react';

// Importa ferramentas para criar estilos e elementos visuais
import { TextInput, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Lista de tarefas
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
  // Verifica os campos, adiciona a tarefa à lista e fecha o formulário
  const handleAddTask = () => {
    if (newTaskName && newTaskSubject && newTaskDate) {
      const newTask = {
        id: (taskList.length + 1).toString(),
        name: newTaskName,
        subject: newTaskSubject,
        date: newTaskDate,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      setNewTaskName('');
      setNewTaskSubject('');
      setNewTaskDate('');
      setShowForm(false);
    }
  };
  return (
    // Caixa principal da tela, usando o estilo "container"
    <ScrollView contentContainerStyle={styles.container}>

      {/* Título do aplicativo */}
      <Text style={styles.title}>Organizador de estudos!</Text>
      {/* Caixa verde que resume as tarefas do dia */}
      <View style={styles.summaryCard}>
        {/* Explica o que o número representa */}
        <Text style={styles.summaryLabel}>Tarefas para hoje</Text>
        {/* Mostra o número de tarefas */}
        <Text style={styles.summaryNumber}>1 tarefa</Text>
      </View>

      {/* Título da próxima seção da tela */}
      <Text style={styles.sectionTitle}>Minhas matérias</Text>
      {/* Caixa para cada matéria */}
      <View style={styles.subjectCard}>
        {/* Nome da matéria */}
        <Text style={styles.subjectName}>Matemática</Text>
        {/* Resumo das tarefas da matéria */}
        <Text style={styles.subjectInfo}>1 tarefa pendente</Text>
      </View>

      {/* Título da lista de tarefas */}
      <Text style={styles.sectionTitle}>Próximas tarefas</Text>

      {/* Botão para abrir ou fechar o formulário */}
      <Pressable onPress={() => setShowForm(!showForm)}>
        <Text>Adicionar tarefa</Text>
      </Pressable>
      {/* O campo aparece apenas quando showForm é verdadeiro */}
      {showForm && (
        <View>
          <TextInput
            placeholder="Digite o nome da nova tarefa"
            value={newTaskName}
            onChangeText={setNewTaskName}
          />
          <TextInput
            placeholder="Matéria"
            value={newTaskSubject}
            onChangeText={setNewTaskSubject}
          />
          <TextInput
            placeholder="Data"
            value={newTaskDate}
            onChangeText={setNewTaskDate}
          />
          <Pressable onPress={handleAddTask}>
            <Text>Salvar tarefa</Text>
          </Pressable>
        </View>
      )}

      {/* Lista de tarefas */}
      {taskList.map((task) => (
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
          </View>
        </View>
      ))}

      {/* Aparência da barra superior do celular */}
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
  // Aparência da caixa de cada matéria
  subjectCard: {
    width: '90%', // ocupa 90% da largura disponível
    maxWidth: 520, // limita a largura em telas grandes
    backgroundColor: '#FFFFFF', // cor de fundo branco
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
  // Aparência do resumo das matéria
  subjectInfo: {
    color: '#777A72', // cor do texto
    fontSize: 14, // tamanho da letra
    marginTop: 6, // espaço acima do texto
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
  // Aparência da matéria da tarefa
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
  // Aparência do contêiner principal
  container: {
    flexGrow: 1, // ocupa toda a tela
    backgroundColor: '#fff', // cor de fundo branca
    paddingTop: 40, //espaço acima do conteúdo
    paddingBottom: 32, // espaço depois do conteúdo
    alignItems: 'center', // centraliza o conteúdo horizontalmente
    justifyContent: 'flex-start', // começa o conteúdo no topo
  },
});
