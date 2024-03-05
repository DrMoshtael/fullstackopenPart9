const Notify = ({notification}: {notification: string}) => {
    if (notification === '') return null;
    else return (
        <p style={{color: 'red'}}>{notification}</p>
    );
};

export default Notify;