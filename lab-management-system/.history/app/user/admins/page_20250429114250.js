export default function Admins() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Administradores</h1>
            <p className="text-gray-700">Aqui você pode gerenciar os administradores do sistema.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Adicionar Administrador
            </button>
        </div>
    );
}