import { useRef, useState, useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagemCorretora from '../public/corretora.webp'
import Reels1 from '../public/reels1.mp4'
import BalnearioCamboriu from '../public/bc.webp'
import Tumbnail from '../public/tumb.webp'
import {api} from './api';
import { carouselItems } from './CarouselData'; // Importe os dados do carrossel
import Slider from 'react-slick';
import emailjs from 'emailjs-com';
import ScrollReveal from 'scrollreveal';
import InputMask from 'react-input-mask';
import './App.css'

function App() {
  const [status, setStatus] = useState(null);

  const videoRef = useRef(null)
  const allStagesRef = useRef(null)
  const stageControls = useRef(null)
  const sucessRef = useRef(null)
  const tumbRef = useRef(null)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [prefer, setPrefer] = useState('');

  const [isPlaying, setIsPlaying] = useState(false)

  const [selectedType, setSelectedType] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '5px', // Ajuste a quantidade de padding conforme necessário
    focusOnSelect: true,
    arrows: false, // Desativa os botões de navegação
    responsive: [
      {
        breakpoint: 768, // Ajusta para tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '5px'
        }
      },
      {
        breakpoint: 480, // Ajusta para celulares
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0px' // Remove padding para celulares
        }
      }
    ]
  };
  const reelsRef = useRef(null);
  const muteRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const removeIcon = () => {
    muteRef.current.style.display = 'none'
  }

  const toggleMute = () => {
    if(reelsRef.current){
      if(isPlaying === false){
        reelsRef.current.play();
        setIsPlaying(true)

        setIsMuted(!isMuted);
        muteRef.current.style.display = 'none'
        tumbRef.current.style.display = 'none'
      }
      else{
        console.log("Já está em curso.");
      }


    }
  };




  useEffect(() => {
    const getStage = async () => {
      const response = await api.get('/sapphire-tower')
      console.log(response.data)
      setGeralServicesStage(response.data.stages[0].percentage)
      setStructureStage(response.data.stages[1].percentage)
      setSealingStage(response.data.stages[2].percentage)
      setInstallationStage(response.data.stages[3].percentage)
      setArgamassaStage(response.data.stages[4].percentage)
      setElevatorStage(response.data.stages[5].percentage)
      setAcabamentosStage(response.data.stages[6].percentage)
      setEsquadriasStage(response.data.stages[7].percentage)
      setMoveisStage(response.data.stages[8].percentage)
      setProgress(response.data.stage)
    }
    getStage()
  }, [])


  useEffect(() => {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 200
    });

    sr.reveal('.header', { origin: 'top' });
    sr.reveal('.video-frame', { origin: 'bottom' });
    sr.reveal('.about', { origin: 'bottom' });
    sr.reveal('.carrossel', { origin: 'bottom' });
    videoRef.current.style.display = 'none'
  }, []);

  const handleSubmit = () => {
    if(name === '' || email === '' || telefone === ''){
      alert('Preencha todos os campos para que possamos entrar em contato.')
      return;
    }
    else{
      const templateParams = {
        from_name: name,
        email: email,
        telefone: telefone,
        value: selectedValue,
        type: selectedType,
        preferencia: prefer
      }
      emailjs.send('sapphire_tower', 'template_inr134g', templateParams, 'JPAVWt7ZEJ6dVPsm4')
      setName('')
      setEmail('')
      setTelefone('')
      sucessRef.current.style.display = 'flex'
    }
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangeTelefone = (e) => {
    setTelefone(e.target.value)
  }

  const handleCheck = (item) => {
    if(item === 'wpp'){
      setIsCheckedWpp(true)
      setPrefer('WhatsApp')
      setIsCheckedMail(false)
      setIsCheckedTel(false)
    }
    if(item === 'tel'){
      setIsCheckedWpp(false)
      setIsCheckedMail(false)
      setIsCheckedTel(true)
      setPrefer('Telefone')
    }
    if(item === 'mail'){
      setIsCheckedWpp(false)
      setIsCheckedMail(true)
      setPrefer('E-Mail')
      setIsCheckedTel(false)
    }
  }
  const handleType = (event) => {
    setSelectedType(event.target.value);
  };
  const handleValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showStages = () => {
    allStagesRef.current.style.display = 'flex';
    stageControls.current.style.display = 'none';
  }

  const openVideoModal = () => {
    videoRef.current.style.display = 'flex'
  }

  const closeVideoModal = () => {
    videoRef.current.style.display = 'none'
  }

  return (
    <div className='App'>

      <div className='video-modal' ref={videoRef}>
        <i className="bi bi-x-lg" id='close-video-btn' onClick={closeVideoModal}></i>
        <div className='frame-video'>
          <iframe id='iframe' src="https://www.youtube.com/embed/kgTP7A8gImY" title="YOUTUBE VIDEO PLAYER" frameborder="0" allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>


      <div className='header'>
        <div className='more-infor'>
          <span className='title-of'>
            SAPPHIRE TOWER
          </span>
          <span className='subtitle-nav'>
            O Refúgio de Luxo na Barra Norte
          </span>
          <span className='apresentacao'>
            AV. BRASIL - BARRA NORTE
          </span>
          <span className='lancamento'>LANÇAMENTO</span>

        </div>
      </div>


      <div className='video-frame' id='section1'>
          <div className='title-video-frame'>
            <div className='reels1-div'>
              <div className='tumb-div' ref={tumbRef}>
                <img className='tumb' src={Tumbnail} alt="" />
              </div>
              <i className="bi bi-play-circle-fill" ref={muteRef} onClick={toggleMute}></i>
              <video className='video-reels1-style' ref={reelsRef} onClick={removeIcon} controls={true}>

                <source src={Reels1} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className='info-reels1'>
              <span className='title-video'>Sapphire Tower</span>
              <span className='subtitle-video'>
                Bem-vindo ao Sapphire Tower, um ícone de luxo e elegância na Barra Norte de Balneário Camboriú, inspirado na beleza da preciosa pedra safira. Com 215 metros de altura e 59 andares, este empreendimento foi meticulosamente projetado para oferecer uma experiência de vida incomparável, refletindo a excelência da FG Empreendimentos. Os apartamentos variam de 146m² a 298m², com opções de quatro ou cinco dormitórios, incluindo suítes e demi-suítes, garantindo conforto e privacidade para todos. Venha viver os privilégios reservados àqueles que valorizam o verdadeiro luxo e sofisticação em cada detalhe!
              </span>
            </div>

          </div>

      </div>

      <div className='copy-frame'>
        <span className='copy1'>
          Se você procura um lar que una elegância, conforto e uma localização privilegiada, a <span className='text-especial'>Sapphire Tower</span> é a escolha ideal. Este projeto exclusivo da <span className='text-especial'>FG Empreendimentos</span>, com entrega prevista para 2027, vai além de um simples imóvel; é a realização de um <span className='text-especial'>estilo de vida inigualável</span>.
        </span>
        <span className='copy2'>
          Por Que a Sapphire Tower é Incomparável?
        </span>
        <div className='topics-copy'>
          <div className="topic">
            <h1>Design Excepcional</h1>
            <h2>Apartamentos de 4 suítes a partir de 146 m², meticulosamente projetados para oferecer um ambiente sofisticado e acolhedor, perfeito para a sua família.</h2>
          </div>
          <div className="topic">
            <h1>Exclusividade em Cada Andar</h1>
            <h2>Com apenas 2 apartamentos por andar, você desfruta de privacidade e tranquilidade em um edifício imponente de 59 andares e 215 metros de altura.</h2>
          </div>
          <div className="topic">
            <h1>Lazer Sem Limites</h1>
            <h2>Desfrute de 2 andares inteiramente dedicados ao lazer e um rooftop de 2.300 m², ideal para relaxar e socializar, com vistas deslumbrantes que vão tirar o seu fôlego.</h2>
          </div>
          <div className="topic">
            <h1>Facilidade de Pagamento</h1>
            <h2>Aproveite condições excepcionais de pagamento, com a possibilidade de financiar em até 100x diretamente com a construtora. Um investimento que se encaixa perfeitamente no seu planejamento financeiro.</h2>
          </div>
        </div>
      </div>

      <Slider className='slider-conf' {...settings}>
      {carouselItems.map((item, index) => (
        <div key={index} className="carousel-slide">
          <img src={item.src} alt={item.alt} />
          <div className="caption">{item.caption}</div>
        </div>
      ))}
    </Slider>


      <div className='video'>
        <span className='video-btn' onClick={openVideoModal}>VÍDEO</span>
      </div>
      <div className='video'>
        <a href="#form" className='linker'><span className='video-btn'>SAIBA MAIS</span></a>
      </div>

      <div className='copywrite-2' style={{ backgroundImage: `url(${BalnearioCamboriu})` }}>
        <div className='filter-bc'></div>
        <span className='write1'>
          Uma Oportunidade Única !
        </span>
        <span className='write2'>
          <strong className="texto-especial">Balneário Camboriú</strong>, conhecida por suas <strong className="texto-especial">praias deslumbrantes</strong> e vibrante vida urbana, tem experimentado um crescimento notável na construção civil nos últimos anos. Este <strong className="texto-especial">desenvolvimento</strong> é impulsionado por <strong className="texto-especial">investimentos</strong> significativos em infraestrutura. A cidade tem se destacado com o <strong className="texto-especial">alargamento da faixa de areia</strong>, proporcionando mais espaço para <strong className="texto-especial">lazer e atividades ao ar livre</strong>. Essa expansão, juntamente com a revitalização de áreas públicas e melhorias no transporte, tem contribuído para a <strong className="texto-especial">valorização dos imóveis</strong>, tornando <strong className="texto-especial">Balneário Camboriú</strong> uma das cidades mais <strong className="texto-especial">procuradas</strong> de Santa Catarina.
          A combinação de um ambiente <strong className="texto-especial">urbano</strong> dinâmico com a <strong className="texto-especial">tranquilidade das praias</strong> faz da cidade um verdadeiro <strong className="texto-especial">paraíso</strong>.
        </span>
      </div>

      <div className='frase-efeito'>
        <span>Viva com intensidade tudo que Balneário Camboriú tem para oferecer,
        dentro de uma das localizações mais nobres da cidade.</span>
      </div>


      <div className='location-frame'>
        <div className='location-title'>
          <span className='title-location'>Localização</span>
        </div>
        <div className='location'>
        <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.689369292073!2d-48.6372817!3d-26.9767346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8c9f8f66d9279%3A0x95a1e7192258f3b2!2sAv.%20Brasil%2C%20240%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC%2C%2088330-040!5e0!3m2!1spt-BR!2sbr!4v1722908745186!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>


      <div className='about'>
        <div className='about-title-frame'>
          <img className='imagem-corretora' src={ImagemCorretora} alt="" />
          <div className='info-corretora'>
            <span className='title-corretora'>Elizângela Rufatto</span>
            <span className='about-title'>Corretora credenciada FG Empreendimentos, com mais de 8 anos de experiência no mercado imobiliário, especialista em imóveis de Alto Padrão no litoral catarinense.
            Quando se fala em investimento, vai além do financeiro, é preciso segurança e solidez. Conte comigo para um excelente investimento.</span>
          </div>

        </div>
      </div>

      <div className='contact-frame'>
        <span className='contact-title' id="form">Entre em contato</span>
        <span className='subtitle-contact'>Preencha os dados logo abaixo para que possamos entrar em contato.</span>
        <div className='form-frame'>
          <div className='form-action'>
            <input type="text" placeholder='Nome' value={name} onChange={handleChangeName} maxLength={100} />
          </div>
          <div className='form-action'>
            <input type="text" placeholder='Email' value={email} onChange={handleChangeEmail} maxLength={100} />
          </div>
          <div className='form-action'>
            <InputMask className='masked' mask="(99) 99999-9999" maskChar={null} type="text" placeholder='Telefone' value={telefone} onChange={handleChangeTelefone} />
          </div>
          <div className='form-action'>
            <input className='inpt-tower' type="text" placeholder='Sapphire Tower' disabled />
          </div>
          <div className='form-action'>
            <select
              id="valor-investimento"
              onChange={handleValue}
              value={selectedValue}
            >
              <option value="Não informado">Valor de investimento</option>
              <option value="De 1,8 milhões até 2 milhões">De 1,8 milhões até 2 milhões</option>
              <option value="De 2 milhões até 3 milhões">De 2 milhões até 3 milhões</option>
              <option value="De 3 milhões até 5 milhões">De 3 milhões até 5 milhões</option>
            </select>
          </div>
          <div className='form-action'>
            <select
                id="tipo-investimento"
                onChange={handleType}
                value={selectedType}
              >
                <option value="Não informado">Tipo de investimento</option>
                <option value="Moradia">Moradia</option>
                <option value="Investimento">Investimento</option>
              </select>
          </div>
          <div className='form-action'>

            <span className='submit-btn' onClick={handleSubmit}>ENVIAR</span>
            <span className='sucess-msg' ref={sucessRef}>Tudo certo ! Entraremos em contato em breve.</span>

          </div>
        </div>

      </div>

      <div className='footer'>
            <span>Elizângela Rufatto © 2024. Todos os direitos reservados.</span>
            <span>CRECI/SC Nº 31.696 | Incorporação: 132.752</span>
      </div>

    </div>
  )
}

export default App
