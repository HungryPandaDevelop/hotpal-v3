import { addMysql } from 'pages/mysql/addMysql';
const AddBase = () => {


  const addToBase = () => {
    const tempData = {
      uid: "test",
      email: "email",
      name: "name",
      gender: "gender",
    }
    addMysql(tempData);
  }

  return (
    <div>
      <div className="stub"></div>
      <div className="main-full">
        <div className="content">
          <h1>Add</h1>
          <div>
            <div className="btn btn--blue" onClick={addToBase}>Добавить</div>
          </div>

        </div>
      </div>

    </div >
  )
}

export default AddBase;
