/**********************************************************************************************************************************                                     *
* Objetivo: Arquivo responsável por fazer o CRUD no Banco de Dados MySQL
* Data: 30/01/24                                                                                                                  *
* Autor: Leonardo Torquato                                                                                                             *
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

/**
 * $queryRawUnsafe(sql) --encaminha uma variavel
 * $queryRaw('select * from tbl_filme') -- encaminha o script direto
 */

const prisma = new PrismaClient()

const insertFilme = async function(dadosFilme) {

    //Cria a variavel SQL
    let sql;

    //Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD 
    if (dadosFilme.data_relancamento == null || 
        dadosFilme.data_relancamento == undefined || 
        dadosFilme.data_relancamento == ''
        
        ){
    //Script SQL com valor null para a data
    sql = ` insert into tbl_filme (      nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento, 
                                            data_relancamento, 
                                            foto_capa, 
                                            valor_unitario
                                            ) value(
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.data_lancamento}',
                                            null,
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}'
                                            )`
}else {
    //Script SQL com a data 
    sql = ` insert into tbl_filme (      nome, 
                                            sinopse, 
                                            duracao, 
                                            data_lancamento, 
                                            data_relancamento, 
                                            foto_capa, 
                                            valor_unitario
                                            ) value(
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.data_lancamento}',
                                            '${dadosFilme.data_relancamento}',
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}'
                                            )`
}

let result = await prisma.$executeRawUnsafe(sql);

if(result)
    return true;
else
    return false;
}
const updateFilme = async function() {

}

const deleteFilme = async function() {

}

const selectAllFilmes = async function() {
    try {
        let sql = 'select * from tbl_filme'

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }

}

const selectFilmeById = async function(id) {

    try {
        let sql = `select * from tbl_filme where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

const selectFilmeByName = async function(name) {
    try {
        let sql = `select * from tbl_filme where nome like "%${name}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeById,
    selectFilmeByName
}
