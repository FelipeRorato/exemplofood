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
    const carrinho = items.filter(item.quantidade >0)

    //Reduce: calcula a soma dos itens (preco*quantidade) e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((ac, item)=>ac.item.preco * item.quantidade, 0)
    const total = subTotal >0 ? subTotal + taxaEntrega: 0;
    


  return (
    <>
      
    </>
  )
}

export default Pedido
