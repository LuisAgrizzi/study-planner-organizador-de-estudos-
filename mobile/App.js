// Importa o controle da barra superior do celular
import { StatusBar } from 'expo-status-bar';

// Importa ferramentas para criar estilos e elementos visuais
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Componente principal: monta a tela do aplicativo
export default function App() {
  return (
    // Caixa principal da tela, usando o estilo "container"
    <View style={styles.container}>

      {/* Título do aplicativo */}
      <Text style={styles.title}>Organizador de estudos!</Text>
      {/* Caixa verde que resume as tarefas do dia */}
      <View style={styles.summaryCard}>
        {/* Explica o que o número representa */}
        <Text style={styles.summaryLabel}>Tarefas para hoje</Text>
        {/* Mostra o número de tarefas */}
        <Text style={styles.summaryNumber}>3 tarefas</Text>
      </View>

      {/* Título da próxima seção da tela */}
      <Text style={styles.sectionTitle}>Minhas matérias</Text>
      {/* Caixa para cada matéria */}
      <View style={styles.subjectCard}>
        {/* Nome da matéria */}
        <Text style={styles.subjectName}>Matemática</Text>
        {/* Resumo das tarefas da matéria */}
        <Text style={styles.subjectInfo}>3 tarefas pendentes</Text>
      </View>

      {/* Título da lista de tarefas */}
      <Text style={styles.sectionTitle}>Próximas tarefas</Text>
      {/* Cartão de uma tarefa */}
      <View style={styles.taskCard}>
        {/* Círculo visual para indicar que ainda não foi concluida */}
        <View style={styles.taskCheck} />
        {/* Agrupa o nome e a matéria da tarefa */}
        <View style={styles.taskInfo}>
          <Text style={styles.taskName}>Lista de exercício - funções</Text>
          <Text style={styles.taskMeta}>Matemática - Hoje</Text>
        </View>
      </View>


      {/* Aparência da barra superior do celular */}
      <StatusBar style="auto" />
    </View>
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
    backgroundColor: '#FFFFFF', // cor de fundo verde claro
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
  },
  // Aparência do contêiner principal
  container: {
    flex: 1, // ocupa toda a tela
    backgroundColor: '#fff', // cor de fundo branca
    alignItems: 'center', // centraliza o conteúdo horizontalmente
    justifyContent: 'center', // centraliza o conteúdo verticalmente
  },
});
