import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher }from '../../components/TeacherItem';
import Input from '../../components/Input';

import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList(){
    const [teachers, setTeachers] = useState<Array<Teacher>>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        async function getTeachers(){
            const {data} = await api.get('classes');
            setTeachers(data);
        }

        getTeachers();
    },[])

    function clean(){
        setSubject('');
        setTime('');
        setWeekDay('');
    }

    function handleCheckProffy(data:Array<Teacher>){
        if(data.length === 0){
            alert("Nenhum proffy encontrado")
            clean();
            return;
        }

        setTeachers(data);
        clean();
    }

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        if(!subject && !week_day && !time){
            alert("Preencha os filtros corretamente");
            clean();
            return;
        }

        //Se tiver filtro, mas tiver faltando um dos filtros
        if(!subject || !week_day || !time){
            //tem materia
            if(subject){
                if(week_day){ //tem materia e dia da semana
                    const {data} = await api.get('classes', {
                        params:{
                            subject,
                            week_day, 
                        }
                    })
        
                    handleCheckProffy(data);                    
                }else if(time){ //tem matéria e horario
                    const {data} = await api.get('classes', {
                        params:{
                            subject,
                            time  
                        }
                    })
                    handleCheckProffy(data);
                }else{ // tem so materia
                    const {data} = await api.get('classes', {
                        params:{
                            subject,
                        }
                    })
            
                    handleCheckProffy(data);
                }
            }else if(week_day){ //tem dia da semana
                if(time){ //tem dia da semana e horario
                    const {data} = await api.get('classes', {
                        params:{
                            week_day,
                            time  
                        }
                    })
                    handleCheckProffy(data);
                }else{// tem só dia da semana
                    const {data} = await api.get('classes', {
                        params:{
                            week_day,
                        }
                    })
            
                    handleCheckProffy(data);
                }
            }else if(time){ //tem somente o horario
                const {data} = await api.get('classes', {
                    params:{
                        time  
                    }
                })
                handleCheckProffy(data);
            }
            clean();
            return;
        }

        const {data} = await api.get('classes', {
            params:{
                subject,
                week_day,
                time  
            }
        })

        handleCheckProffy(data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={ e => {setSubject(e.target.value) }}
                            options={[
                                {value: 'Artes', label:'Artes'},
                                {value: 'Ciências', label:'Ciências'},
                                {value: 'Biologia', label:'Biologia'},
                                {value: 'Educação Física', label:'Educação Física'},
                                {value: 'Física', label:'Fisica'},
                                {value: 'Geografia', label:'Geografia'},
                                {value: 'História', label:'História'},
                                {value: 'Matemática', label:'Matemática'},
                                {value: 'Quimíca', label:'Quimíca'},
                            ]}
                        />

                        <Select 
                            name="week_day" 
                            label="Dia da semana"
                            value={week_day}
                            onChange={ e => {setWeekDay(e.target.value) }}
                            options={[
                                {value: '0', label:'Domingo'},
                                {value: '1', label:'Segunda-feira'},
                                {value: '2', label:'Terça-feira'},
                                {value: '3', label:'Quarta-feira'},
                                {value: '4', label:'Quinta-feira'},
                                {value: '5', label:'Sexta-feira'},
                                {value: '6', label:'Sábado'},
                            ]}
                        />

                    <Input 
                        type="time" 
                        name="time"
                        value={time}
                        onChange={ e => {setTime(e.target.value)}} 
                        label="Hora"
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return(
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    );
                })}
            </main>
        </div>
    )
}

export default TeacherList;