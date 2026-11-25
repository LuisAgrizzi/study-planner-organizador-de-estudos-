// Barra de status fornecida pelo Expo
import { StatusBar } from 'expo-status-bar';

// Guarda os dados que mudam durante o uso do aplicativo
import { useState } from 'react';

// Importa os componentes usados para montar e estilizar a tela
import {
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

// Converte uma data para o formato DD/MM/AAAA usado nas tarefas
const formatTaskDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Componente principal do aplicativo
export default function App() {
  // Dados da lista e do formulário de tarefas
  const [taskList, setTaskList] = useState(tasks);
  const [showForm, setShowForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');

  // Mês exibido no calendário
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

  // Estado dos avisos, filtros e edição
  const [formError, setFormError] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIndex = calendarMonth.getMonth();
  const calendarStartDay = new Date(
    calendarYear,
    calendarMonthIndex,
    1
  ).getDay();
  // Gera seis semanas, incluindo dias do mês anterior e do próximo
  const calendarDays = Array.from({ length: 42 }, (_, index) =>
    new Date(calendarYear, calendarMonthIndex, index - calendarStartDay + 1)
  );

  // Salva uma tarefa nova ou atualiza a tarefa que está sendo editada
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
    } else {
      setFormError('Por favor, preencha todos os campos.');
    }
  };

  // Remove uma tarefa da lista
  const handleDeleteTask = (taskId) => {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  // Carrega os dados da tarefa selecionada no formulário
  const handleEditTask = (task) => {
    setNewTaskName(task.name);
    setNewTaskSubject(task.subject);
    setNewTaskDate(task.date);

    const dateParts = task.date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dateParts) {
      setCalendarMonth(
        new Date(Number(dateParts[3]), Number(dateParts[2]) - 1, 1)
      );
    }
    setEditingTaskId(task.id);
    setFormError('');
    setShowForm(true);
  };
  // Conta as tarefas de hoje, inclusive as selecionadas pelo calendário
  const todayDate = formatTaskDate(new Date());
  const taskTodayCount = taskList.filter(
    (task) => task.date === 'Hoje' || task.date === todayDate
  ).length;
  // Lista as matérias sem repetir nomes
  const subjectList = [...new Set(taskList.map((task) => task.subject))];

  // Aplica o filtro escolhido à lista de tarefas
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
        <Text style={styles.summaryLabel}>Tarefas para hoje</Text>
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
      <Pressable
        style={styles.formButton}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.formButtonText}>Adicionar tarefa</Text>
      </Pressable>
      {/* Formulário para adicionar ou editar uma tarefa */}
      {showForm && (
        <View>
          <TextInput
            style={styles.taskInput}
            placeholder="Digite o nome da nova tarefa"
            value={newTaskName}
            onChangeText={setNewTaskName}
          />
          <TextInput
            style={styles.taskInput}
            placeholder="Matéria"
            value={newTaskSubject}
            onChangeText={setNewTaskSubject}
          />
          <View style={styles.dateOptions}>
            <Pressable
              style={[
                styles.dateOption,
                newTaskDate === 'Hoje' && styles.dateOptionSelected,
              ]}
              onPress={() => setNewTaskDate('Hoje')}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  newTaskDate === 'Hoje' && styles.dateOptionTextSelected,
                ]}
              >
                Hoje
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.dateOption,
                newTaskDate === 'Amanhã' && styles.dateOptionSelected,
              ]}
              onPress={() => setNewTaskDate('Amanhã')}
            >
              <Text
                style={[
                  styles.dateOptionText,
                  newTaskDate === 'Amanhã' && styles.dateOptionTextSelected,
                ]}
              >
                Amanhã
              </Text>
            </Pressable>
          </View>
          <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
              <Pressable
                style={styles.calendarNavButton}
                onPress={() =>
                  setCalendarMonth(
                    new Date(calendarYear, calendarMonthIndex - 1, 1)
                  )
                }
              >
                <Text style={styles.calendarNavText}>‹</Text>
              </Pressable>
              <Text style={styles.calendarMonthText}>
                {calendarMonth.toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              <Pressable
                style={styles.calendarNavButton}
                onPress={() =>
                  setCalendarMonth(
                    new Date(calendarYear, calendarMonthIndex + 1, 1)
                  )
                }
              >
                <Text style={styles.calendarNavText}>›</Text>
              </Pressable>
            </View>
            <View style={styles.calendarWeekRow}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <Text key={day} style={styles.calendarWeekDay}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {calendarDays.map((day) => {
                const dayDate = formatTaskDate(day);
                const isSelected = newTaskDate === dayDate;
                const isOutsideMonth = day.getMonth() !== calendarMonthIndex;

                return (
                  <Pressable
                    key={dayDate}
                    style={styles.calendarDayCell}
                    onPress={() => {
                      setNewTaskDate(dayDate);
                      setFormError('');
                    }}
                  >
                    <View
                      style={[
                        styles.calendarDayButton,
                        isSelected && styles.calendarDayButtonSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.calendarDayText,
                          isOutsideMonth && styles.calendarDayTextOutside,
                          isSelected && styles.calendarDayTextSelected,
                        ]}
                      >
                        {day.getDate()}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          {formError !== '' && (
            <Text style={styles.formErrorText}>{formError}</Text>
          )}
          {/* Salva ou atualiza a tarefa */}
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
            style={[
              styles.taskCheck,
              task.completed && styles.taskCheckCompleted,
            ]}
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
            {task.completed && (
              <Text style={styles.taskCheckText}>✓</Text>
            )}
          </Pressable>
          <View style={styles.taskInfo}>
            <Text
              style={[
                styles.taskName,
                task.completed && styles.taskNameCompleted,
              ]}
            >
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

      {/* Define a aparência da barra de status do sistema */}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Guarda os estilos usados pelos elementos acima
const styles = StyleSheet.create({
  // Aparência do título principal
  title: {
    color: '#20221F',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  // Aparência da caixa de resumo
  summaryCard: {
    width: '90%',
    maxWidth: 520,
    backgroundColor: '#466C52',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#E7EFE8',
    fontSize: 14,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  sectionTitle: {
    color: '#20221F',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },
  // Aparência do cartão de cada matéria
  subjectCard: {
    width: '90%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  // Aparência do nome da matéria
  subjectName: {
    color: '#20221F',
    fontSize: 18,
    fontWeight: '700',
  },
  // Aparência da contagem de tarefas pendentes da matéria
  subjectInfo: {
    color: '#777A72',
    fontSize: 14,
    marginTop: 6,
  },
  // Aparência dos campos de texto do formulário
  taskInput: {
    width: '90%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD8',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  // Organiza as opções de data lado a lado
  dateOptions: {
    width: '90%',
    maxWidth: 520,
    flexDirection: 'row',
    marginBottom: 10,
  },
  // Aparência normal das opções de data
  dateOption: {
    flex: 1,
    backgroundColor: '#E7EFE8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 6,
  },
  // Fundo verde para a data selecionada
  dateOptionSelected: {
    backgroundColor: '#466C52',
  },
  // Aparência normal do texto das opções
  dateOptionText: {
    color: '#466C52',
    fontSize: 14,
    fontWeight: '700',
  },
  // Texto branco na opção selecionada
  dateOptionTextSelected: {
    color: '#FFFFFF',
  },
  // Aparência do calendário de escolha da data
  calendar: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  // Organiza os controles do cabeçalho do calendário
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calendarNavButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E7EFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarNavText: {
    color: '#466C52',
    fontSize: 24,
    fontWeight: '700',
  },
  calendarMonthText: {
    color: '#20221F',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  // Mostra os nomes dos dias da semana
  calendarWeekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  calendarWeekDay: {
    width: '14.2857%',
    color: '#777A72',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  // Organiza os dias em sete colunas
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayCell: {
    width: '14.2857%',
    padding: 2,
  },
  calendarDayButton: {
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayButtonSelected: {
    backgroundColor: '#466C52',
  },
  calendarDayText: {
    color: '#20221F',
    fontSize: 14,
  },
  calendarDayTextOutside: {
    color: '#B5B8B1',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Aparência dos botões do formulário
  formButton: {
    backgroundColor: '#466C52',
    width: '90%',
    maxWidth: 520,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  // Aparência do texto dentro dos botões do formulário
  formButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  formErrorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
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
    backgroundColor: '#B42318',
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  // Aparência do texto dentro do botão de exclusão
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Aparência da caixa de tarefa
  taskCard: {
    width: '90%',
    maxWidth: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Organiza as informações ao lado do círculo
  taskInfo: {
    flex: 1,
  },
  // Aparência do nome da tarefa
  taskName: {
    color: '#20221F',
    fontSize: 16,
    fontWeight: '700',
  },
  // Aparência do nome quando a tarefa está concluída
  taskNameCompleted: {
    color: '#777A72',
    textDecorationLine: 'line-through',
  },
  // Aparência do texto com a matéria e a data da tarefa
  taskMeta: {
    color: '#777A72',
    fontSize: 14,
    marginTop: 4,
  },
  // Aparência do círculo de verificação
  taskCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#466C52',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Aparência do círculo de verificação quando a tarefa está concluída
  taskCheckCompleted: {
    backgroundColor: '#466C52',
  },
  // Aparência do texto de verificação
  taskCheckText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  // Aparência do conteúdo dentro da tela rolável
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
