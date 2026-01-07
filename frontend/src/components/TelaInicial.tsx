interface TelaInicialProps {
  userName?: string
}

const TelaInicial = ({ userName = 'João Silva' }: TelaInicialProps) => {
  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Bem-vindo(a)
        </h1>
        <p className="text-2xl font-semibold text-indigo-100">
          {userName}
        </p>
      </div>
    </div>
  )
}

export default TelaInicial
