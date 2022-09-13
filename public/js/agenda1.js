//const { default: axios } = require("axios");

      document.addEventListener('DOMContentLoaded', function() {

        let formulario = document.querySelector("#formularioEventos");
        var calendarEl = document.getElementById('agenda1');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale: "es",
          displayEventTime:false,

          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
//            right: 'dayGridMonth,timeGridWeek,listWeek'
            right: 'dayGridMonth,listWeek'

            },
            events: "http://localhost/agenda1/public/evento/mostrar",
            //events:baseURL+"/evento/mostrar",
            //eventSource:{
                //url: baseURL+"/evento/mostrar",
                //method:"POST",
                //extraParams: {
                    //_token: formulario._token.value,
               //}
            //},

            dateClick:function(info){
                formulario.reset();

                formulario.start.value=info.dateStr;
                formulario.end.value=info.dateStr;

                $("#evento").modal("show");
            },
            eventClick:function (info) {

                var evento= info.event;
                console.log(evento);

                //axios.post("http://localhost/agenda1/public/evento/editar/"+info.event.id).
                axios.post(baseURL+"/evento/editar/"+info.event.id).
                then(
                    (respuesta) =>{

                        formulario.id.value= respuesta.data.id;
                        formulario.title.value= respuesta.data.title;
                        
                        formulario.descripcion.value= respuesta.data.descripcion;

                        formulario.start.value= respuesta.data.start;
                        formulario.end.value= respuesta.data.end;


                        $("#evento").modal("show");
                    }
                    ).catch(
                        error=>{
                            if(error.response){
                                console.log(error.response.data);
                            }
                        }
                    )

            }


        });

        calendar.render();

        document.getElementById("btnGuardar").addEventListener("click",function(){

            //enviarDatos("http://localhost/agenda1/public/evento/agregar");
            enviarDatos("/evento/agregar");


        });
        document.getElementById("btnEliminar").addEventListener("click",function(){

            //enviarDatos("http://localhost/agenda1/public/evento/borrar/"+formulario.id.value);
            enviarDatos("/evento/borrar/"+formulario.id.value);

            
        });
        document.getElementById("btnModificar").addEventListener("click",function(){

            //enviarDatos("http://localhost/agenda1/public/evento/actualizar/"+formulario.id.value);
            enviarDatos("/evento/actualizar/"+formulario.id.value);

            
        });

        function enviarDatos(url){

            const datos= new FormData(formulario);
            //console.log(datos);
            //console.log(formulario.title.value);
            // 2
            const nuevaURL = baseURL+url;

            axios.post(nuevaURL, datos).
            //axios.post(url, datos).
            then(
                (respuesta) =>{
                    calendar.refetchEvents();
                    $("#evento").modal("hide");
                }
                ).catch(
                    error=>{
                        if(error.response){console.log(error.response.data);}
                    }
                )

        }



      });