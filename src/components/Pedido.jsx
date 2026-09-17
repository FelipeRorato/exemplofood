import {useState} from 'react'

//Array de objetos contendo o estado inicial do cardápio
const cardapio = [
    {id:1,nome:"Combo hamburgao",preco:50.00,disponivel:true,quantidade:0},
    {id:2,nome:"Combo pizza",preco: 60.00,disponivel:true,quantidade: 0},
    {id:3,nome:"Combo sushi",preco: 100.00,disponivel:true,quantidade: 0},
    {id:4,nome:"Combo bebida",preco: 70.00,disponivel:true,quantidade: 0},
]

const Pedido = () => {

    //hook - usestate - manipula o estado da variavel
    //exemplos vai gerenciar a lista de itens do cardapio
    const [items,setItems]=useState(cardapio);
    const [status, setStatus]=useState('');
    const [enviar,setEnviar]=useState(false);

    //valor fixo adicionado ao total quando tiver itens o carrinho
    const taxaEntrega=5.00;

    //funcao que altera a quantidade do pedido
    const AlterarQuantidade =(id, valor)=>{
        setItems(prev=>
            //Map: percorre a lista para criar um novo array sem modificar o original
            prev.map(item=>
                //ternario: verifica se o item da iteração atual é o que deve ser alterado
                //spread(...item): adiciona o item a lista atual ou modifica
                //Math.max: objeto que arante que a quantidade nunca seja menor que 0
                //item: retorna  item intacto caso o id não corresponda
                item.id===id ? {...item,quantidade: Math.max(0,item.quantidade + valor)}: item
            )
        )
    }

    //Filter: seleciona apenas os produtos disponiveis e do carrinho
    const produtosDisponiveis = items.filter(item =>item.disponivel);
    const carrinho = items.filter(item=>item.quantidade >0)

    //Reduce: calcula a soma dos itens (preco*quantidade) e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((ac, item)=>ac + item.preco * item.quantidade, 0)
    const total = subTotal >0 ? subTotal + taxaEntrega: 0;

    //SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADORES ASSINCRONOS
    
    const confirmarPedido=()=>{
        setEnviar(true);
        setStatus('Restaurante Preparando seu pedido')
        setTimeout(()=>{
            setStatus('Seu pedido saiu para entrega!')
            setEnviar(false);

        },5000)
        setTimeout(()=>{
            setStatus('Seu pedido foi entregue com sucesso')
            setEnviar(false)
        },10000)
    }


  return (
    <div>
        <h1>Cardápio do restaurante</h1>
        {produtosDisponiveis.map(produto=>(
            <div key={produto.id}>
                <span>{produto.nome} (R${produto.preco.toFixed(2)})</span>
                <div>
                    <button onClick={()=>{AlterarQuantidade(produto.id,-1)}}>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={() => {AlterarQuantidade(produto.id,+1)}}>+</button>
                </div>
            </div>
        ))}
      <hr></hr>
      <h3>Resumo da entrega</h3>
      {carrinho.length === 0 ?(
        <p>Seu carrinho está vazio</p>
      ):(
        //fragments
        <>
        <ul>
            {carrinho.map(item=>(
                <li key={item.id}>
                    {item.quantidade} x {item.nome} -R$ {(item.preco * item.quantidade).toFixed(2)}

                </li>

            ))}
        </ul>
        <p>SubTotal R${subTotal.toFixed(2)}</p>
        <p>Taxa de entrega: R$ {taxaEntrega.toFixed(2)}</p>
        <button onClick={confirmarPedido} disabled={enviar}>
            {enviar ? "Enviando..." : 'Confirmar pedido'}
        </button>
        </>
      )}
      {status && (
        <div>
            <strong>Alerta:</strong>{status}
        </div>
      )}
    </div>
  )
}

export default Pedido
