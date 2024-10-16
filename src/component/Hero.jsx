import React from 'react'
import logo from '../assets/logo.svg'
import { Button } from 'react-bootstrap'

const Hero = () => {
  return (
    <div className='Hero'>
      <div className='mynavber  container col-10'>
        <img src={logo} alt="" className='' />
        <Button variant="dark btns" onClick={()=>{window.open("https://github.com/GhaithSawan")}}>Github</Button>
      </div>
      <div className='container col-8 py-4 text-center'>
        <h1 style={{fontSize:"40px",fontWeight:"600"}}>Summarize Articles with </h1>
        <span style={{fontSize:"40px",fontWeight:"600",color:"#e36518"}}>OpenAi GPT-4</span>
        <div className="desc py-3 " style={{}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nostrum magnam quam eveniet eos deleniti cumque aperiam, perspiciatis voluptatum. Quasi sit accusamus repellendus? Porro earum quaerat at. Hic, repellendus officiis?
        </div>
      </div>
    </div>
  )
}
export default Hero 