
    let demo6Shader, img, fft, audio, toggleBtn;
  
 function preload (){
      audio         = loadSound('audio/demo6.mp3')
      demo6Shader   = loadShader('shaders/base.vert', 'shaders/d6.frag')
      img           = loadImage('img/6.jpg')
    }
  
 function setup(){

        audio.loop();
        pixelDensity(1)
        createCanvas(windowWidth, windowHeight, WEBGL)
  
        fft = new p5.FFT()
        shader(demo6Shader)
  
        demo6Shader.setUniform('u_resolution', [img.width, img.height])
        demo6Shader.setUniform('u_texture', img)
        demo6Shader.setUniform('u_tResolution', [img.width, img.height])
    }
  
    function draw(){
      fft.analyze()
  
      const bass    = fft.getEnergy("bass")
      const treble  = fft.getEnergy("treble")
      const mid     = fft.getEnergy("mid")
  
      const mapBass     = map(bass, 0, 255, 10, 15.0)
      const mapTremble  = map(treble, 0, 255, 0, 0.0)
      const mapMid      = map(mid, 0, 255, 0.0, 0.1)
  
      demo6Shader.setUniform('u_time', frameCount / 20)
      demo6Shader.setUniform('u_bass', mapBass)
      demo6Shader.setUniform('u_tremble', mapTremble)
      demo6Shader.setUniform('u_mid', mapMid)
  
      rect(0,0, width, height);
    }
  
    windowResized = () => {
      resizeCanvas(windowWidth, windowHeight)
      demo6Shader.setUniform('u_resolution', [windowWidth, windowHeight])
    }
