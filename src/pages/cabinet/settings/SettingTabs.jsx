
const SettingTabs = ({ currentTab, setCurrentTab }) => {

  const allTabs = [['Смена пароля'], ['Личные данные'], ['Приватность']];

  const choiseTabs = (index) => {
    setCurrentTab(index);
  }

  return (
    <div className="settings-tabs-container">
      {allTabs.map((item, index) => (<div
        className={`settings-tab ${currentTab === index ? 'active' : ''}`}
        key={index}
        onClick={() => { choiseTabs(index) }}
      >{item}</div>))}
    </div>
  )
}

export default SettingTabs
