import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api'
import './filme-info.css'
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function LoadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "9f4bb8c9f952717709bfdb099b7d81dc",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true });
                    return;
                })
        }


        LoadFilme();

        return () => (
            console.log("COMPONENTE FOI DESMONTADO")
        )

    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmesSalvos) =>  filmesSalvos.id === filme.id );

        if (hasFilmes) {
            toast.warn("ESSE FILME JÁ ESTA NA SUA LISTA!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("FILME SALVO COM SUCESSO")

    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando datalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="externo" href={`https://youtube.com/results?search_query=${filme.title}Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;