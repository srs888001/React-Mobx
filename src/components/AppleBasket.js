import { observer } from "mobx-react-lite"
import { useRootStore } from "../store"
import AppleItem from './AppleItem';
import '../styles/appleBasket.scss';

function AppleBasket() {
    const { appleStore } = useRootStore()
    const { currentApples, isPicking, appleStatus, pickApple } = appleStore
    
    let {
        appleNow: { quantity: notEatenQuantity, weight: notEatenWeight },
        appleEaten: { quantity: EatenQuantity, weight: EatenWeight }
    } = appleStatus;


    /** 获取未吃苹果的组件数组*/
    function getAppleItem(apples) {
        let data = [];
        apples.forEach(apple => {
            if (!apple.isEaten) {
                data.push(<AppleItem apple={apple} key={apple.id} />)
            }
        });

        if (!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也</div>);

        return data;
    }

    return (
        <div className="appleBusket">
            <div className="title">苹果篮子</div>

            <div className="stats">
                <div className="section">
                    <div className="head">当前</div>
                    <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克
                    </div>
                </div>
                <div className="section">
                    <div className="head">已吃掉</div>
                    <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
                </div>
            </div>

            <div className="appleList">
                {getAppleItem(currentApples)}
            </div>

            <div className="btn-div">
                <button className={isPicking ? 'disabled' : ''} onClick={pickApple} >摘苹果</button>
            </div>
        </div>
    )
}

export default observer(AppleBasket)
