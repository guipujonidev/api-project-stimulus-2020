import express from 'express'
import mentorModel from '../models/mentorModel.js'

const app = express()

app.post('/api/cadastrar/mentores/:imagem/:nome/:area/', async (request, response) => {
    const dados = {
        imagemPerfil: request.params.imagem,
        nomeMentor: request.params.nome,
        areaMentor: request.params.area,
    }
    try {
        const mentor = new mentorModel(dados)

        await mentor.save()
        response.send({message: 'success', mentor: dados})
    } catch (error) {
        response.status(500).send(error)
    }
}) 

app.post('/api/buscar/mentores', async (request, response) => {

    try {
        const mentores = await mentorModel.find()
        
        if(mentores) {
            response.send({message: 'success', mentores: mentores})
        } else {
        response.send({message: 'Não encontrado'})
        }
    } catch (error) {
        response.status(500).send(error)
    }
}) 



export {app as modelRouter}