// app/page.js
// ...
import { useLaboratories, useAdminUsers } from "../lib/storage"; // Importar os hooks
// ...

export default function Home() {
    // CERTIFIQUE-SE DE QUE ESTÁ CONSUMINDO CORRETAMENTE:
    // O retorno dos hooks agora é [data, loading, refreshData]
    const [laboratories, loadingLaboratories] = useLaboratories(); // Apenas 2 elementos, pois não precisa de setLaboratories aqui
    const [adminUsers, loadingAdminUsers] = useAdminUsers();     // Apenas 2 elementos
    // ... (restante do seu código) ...

    // Seu loading check
    if (loadingLaboratories || loadingAdminUsers) {
        return <div className="p-6 pt-28 text-gray-700">Carregando dados...</div>;
    }
    // ... (restante da renderização da página) ...
}