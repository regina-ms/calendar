import moment from "moment";
import 'moment/locale/ru';

function Calendar(props) {
    let { date } = props;
    date = moment(date);

    return <>
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{date.format('dddd')}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{date.format('D')}</div>
                    <div className="ui-datepicker-material-month">{date.format('MMMM')}</div>
                    <div className="ui-datepicker-material-year">{date.format('YYYY')}</div>
                </div>
            </div>

            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{date.format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{date.format('YYYY')}</span>
                </div>
            </div>
            <UiCalendar today={date} />
        </div>
    </>
}

function UiCalendar(props) {
    const { today } = props

    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');

    const firstDayOfMonth = moment().startOf('month');
    const lastDayOfMonth = moment().endOf('month');

    const dates = [];
    const day = startDay.clone();

    while (!day.isAfter(endDay)) {
        dates.push(day.clone());
        day.add('1', 'day');
    }

    const uiCalendar = [];

    for (let i = 0; i < dates.length; i += 7) {
        uiCalendar.push(dates.slice(i, i + 7))
    }

    const colList = uiCalendar[0].map((el, index) => (
        index === 5 || index === 6 ?
            <col key={el.toString()} className="ui-datepicker-week-end"></col> :
            <col key={el.toString()}></col>
    ))

    const firstDayOfWeek = moment().startOf('week');

    const weekDays = uiCalendar[0].map((el, index) => (
        <th key={el.toString()} scope="col" title={firstDayOfWeek.weekday(index).format('dddd')}>
            {firstDayOfWeek.format('dd')}
        </th>
    ))

    return <table className="ui-datepicker-calendar">
        <colgroup>{colList}</colgroup>
        <thead>
            <tr>{weekDays}</tr>
        </thead>
        <tbody>
            {
                uiCalendar.map((el) => (<tr key={el.toString()}>
                    {
                        el.map((el) => (
                            el.isAfter(lastDayOfMonth) || el.isBefore(firstDayOfMonth) ?
                                <td className="ui-datepicker-other-month" key={el.toString()}>{el.format('D')}</td> :
                                el.format('YYYY MM DD') === today.format('YYYY MM DD') ?
                                    <td className="ui-datepicker-today" key={el.toString()}>{el.format('D')}</td> :
                                    <td key={el.toString()}>{el.format('D')}</td>
                        ))}
                </tr>))
            }
        </tbody>
    </table>
}

export default Calendar