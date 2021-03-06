import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet"
import './styles.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar/admin';
import { Container, Form, FormControl} from 'react-bootstrap';
import BackgroundParticle from '../../components/Background-particle';
import API from "../../api";

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [games, setGames] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        API.get("/users/all").then((res) => {
            setUsers(res.data);
        });
        
        API.get("/game/all").then((res) => {
            setGames(res.data);
        });        
    }, []);

    useEffect(() => {
        if(id === 0){
            API.get("/ranking/all").then((res) => {
                setRanking(res.data);
            }); 
        }
        else{
            API.get(`/ranking/${id}`).then((res) => {
                setRanking(res.data);
            });  
        }
            
    }, [id]);

    return (
        <div>
            <Helmet title="Relatórios"/>
            <Sidebar pageSelected="reports"/>
            <Header headerTitle="Administrador"/>
            <React.Fragment>
            <Container fluid="xl">
                <BackgroundParticle />
            </Container>
            <center>
                <div className="mother">
                    <br />
                    <div className="ranking">
                        <div className="ranking-title">
                            <div className="ranking-title-title-adm">
                                <h2>Ranking</h2>
                            </div>
                            <div className="ranking-title-combo-adm">
                                Filtrar por jogo:
                                <Form>
                                    <FormControl as="select" onChange={((e) => setId(parseInt(e.target.value)))}>
                                        <option value={0} className="select-jogos">---</option>
                                        {games.map((item) => {
                                            return <option value={item.idgame} className="select-jogos">{item.name_game}</option>
                                        })}
                                    </FormControl>
                                </Form>
                             </div>
                        </div>
                        <br />
                        <div className="ranking-body">
                            <table className="table table-striped header-fixed-ranking">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Pontos</th>
                                    <th scope="col">Tempo</th>
                                    <th scope="col">Jogo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((item, index) => {
                                    return <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name_user}</td>
                                        <td>{item.points}</td>
                                        <td>{item.time}</td>
                                        <td>{item.name_game}</td>
                                    </tr>
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="employee">
                        <div className="employee-title">
                            <h2>Funcionários</h2>
                        </div>
                        <div className="employee-body">
                            <table className="table table-striped header-fixed-employee">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Validação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item) => {
                                    return <tr>
                                        <td>{item.name_user}</td>
                                        {/*<td>{item.iduser}</td>*/}
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox" value={item.iduser}/>
                                                <span className="slider round"></span>
                                            </label>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </center>
            </React.Fragment>
        </div>
    );
};

export default Admin;