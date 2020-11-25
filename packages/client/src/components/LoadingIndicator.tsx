import React from 'react';


interface Props {
}

const LoadingIndicator: React.FC<Props> = () => {

    return (
        <div className="alert alert-warning alert-dismissible fade show m-3 fixed-bottom w-25" role="alert" >
            <strong>Идет загрузка!</strong> Не переживайте, скоро все прогрузится 
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};

export default LoadingIndicator;