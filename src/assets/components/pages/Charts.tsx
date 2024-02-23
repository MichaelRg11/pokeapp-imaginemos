import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';


//interface
import { pokemonType as PokemonType } from "../../../Interfaces/PokemonInterfaces";

const Charts: React.FC = () => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = "https://pokeapi.co/api/v2/type/";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && barChartRef.current) {
      const myBarChart = echarts.init(barChartRef.current);

      const barOptions: echarts.EChartOption = {
        xAxis: {
          type: 'category',
          data: data.map(item => item.name),
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: data.map(item => item.pokemon.length),
          itemStyle: {
            emphasis: {
              color: 'skyblue',
            },
          },
        }]
      };

      myBarChart.setOption(barOptions);

      // Agregar evento de clic a las barras
      myBarChart.off('click');
      myBarChart.on('click', function (params: any) {
        const dataIndex = params.dataIndex;
        const urls = data.map((type: PokemonType) => `filtered/${type.name}`);
        const url = urls[dataIndex];
        window.location.href = url;
      });
    }

    if (data.length > 0 && pieChartRef.current) {
      const myPieChart = echarts.init(pieChartRef.current);

      const pieOptions: echarts.EChartOption = {
        series: [
          {
            type: 'pie',
            radius: '50%', 
            data: data.map(item => ({ value: item.pokemon.length, name: item.name })),
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          }
        ]
      };

      myPieChart.setOption(pieOptions);

      // Agregar evento de clic a las piezas del gráfico de pie
      myPieChart.off('click');
      myPieChart.on('click', function (params: any) {
        const dataIndex = params.dataIndex;
        const urls = data.map((type: PokemonType) => `filtered/${type.name}`);
        const url = urls[dataIndex];
        window.location.href = url;
      });
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get<any>(url);
      const typesData: PokemonType[] = await Promise.all(response.data.results.map(async (type: { name: string, url: string }) => {
        const typeResponse = await axios.get<any>(type.url);
        return { name: type.name, pokemon: typeResponse.data.pokemon };
      }));
      setData(typesData);
      setLoading(false);
    } catch (error) {
      setError("There was an error");
      setLoading(false);
    }
  };
  return (
    <>
       <div>
      <div ref={barChartRef} style={{ width: '100%', height: '400px',}} />
      <div ref={pieChartRef} style={{ width: '100%', height: '400px',}} />
    </div>
    </>
  );
};

export default Charts;
