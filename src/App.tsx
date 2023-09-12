import React, { useState } from 'react';
import api from './api/api';

const App: React.FC = () => {
  const [filesSelectAllFiles, setFilesSelectAllFiles] = useState<any>([]);

  const search = () => {
    api
      .get('/upload')
      .then((data) => {
        console.log('data', data);
        setFilesSelectAllFiles(data.data);
      })
      .catch((error) => console.log(error));
  };

  function download(item: any) {
    //Convertendo ArrayBuffer em ArrayBuffer de Memoria
    const buffer = new Uint8Array(item.file.data);
    //Criando Blob
    const blob = new Blob([buffer], { type: item.type });
    //Criando url temporaria para download
    const file = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = file;
    link.download = item.filename;
    link.dispatchEvent(new MouseEvent('click'));

    return item;
  }

  const renderFiles = (arrayFiles: any) => {
    return arrayFiles.map((item: any, key: number) => {
      return (
        <li key={key} onClick={() => download(item)}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              {item.filename}
            </p>
            <img
              alt='img'
              width={50}
              height={50}
              src={URL.createObjectURL(
                new Blob([new Uint8Array(item.file.data)], { type: item.type }),
              )}
            />
          </div>
        </li>
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1>React Cache</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <button onClick={search} style={{ marginRight: '5px' }}>
          Search
        </button>
        {filesSelectAllFiles.length > 0 &&
          ` ${filesSelectAllFiles.length} - Resultados encontrados`}{' '}
      </div>
      <ul
        style={{
          border: '1px solid #000',
          padding: '50px',
          textAlign: 'center',
        }}
      >
        {filesSelectAllFiles.length === 0 && 'Nenhum resultado encontrado'}
        {renderFiles(filesSelectAllFiles)}
      </ul>
    </div>
  );
};

export default App;
