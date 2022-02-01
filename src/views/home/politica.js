import React, { useEffect } from 'react';
import Artigo from '../../componentes/outros/artigo';

const nomeUsuarioPostador = '@adm';
const dataPost = 'em 31 de janeiro, 2022';

const conteudo = [
    {
        'titulo': 'Termos de uso',
        'cont': `   <p>A sua privacidade é importante para nós. É política do Fluxo respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar na plataforma.</p>
                    <p>Solicitamos, por meios justos e legais, com o seu conhecimento e consentimento, informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Também informamos por que estamos coletando e como será usado.</p>
                    <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                    <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                    <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
                    <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                    <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.</p>`
    },
    {
        'titulo': 'Política de cookies',
        'cont': `
                    <div class='mt-3'>
                        <h3 class='is-size-5'>O que são cookies?</h3>
                        <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>Como usamos os cookies?</h3>
                        <p>Utilizamos cookies por vários motivos, detalhados abaixo. Na maioria dos casos, não existem opções para desativar os cookies sem desativar completamente a funcionalidade e os recursos. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>Desativar cookies</h3>
                        <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>Cookies no Fluxo</h3>
                        <ul>
                            <li>Cookies relacionados à conta<br><br> Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.<br><br></li>
                            <li>Cookies relacionados ao login<br><br> Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas a recursos e áreas restritas ao efetuar login.<br><br></li>
                            <li>Cookies de preferências do site<br><br> Para proporcionar uma ótima experiência no Fluxo, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.<br></li>
                        </ul>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>Cookies de terceiros</h3>
                        <p>Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>Mais informações</h3>
                        <p>Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados.</p>
                    </div>`
    }
];

export default function Politica() {
    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Política e termos de uso'
    }, []);

    return (
        <div>
            <Artigo
                nomeUsuarioPostador={nomeUsuarioPostador}
                dataPost={dataPost}
                conteudo={conteudo}
            />
        </div>
    );
}