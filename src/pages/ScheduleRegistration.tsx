import React, { useState } from 'react';

const ScheduleRegistration: React.FC = () => {
  const [siteName, setSiteName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [assignee, setAssignee] = useState('');
  const [notes, setNotes] = useState('');

  const [contacted, setContacted] = useState(false);
  const [siteVisit, setSiteVisit] = useState(false);
  const [estimated, setEstimated] = useState(false);
  const [billed, setBilled] = useState(false);
  const [progress, setProgress] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [hearingCompleted, setHearingCompleted] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 予定登録のロジックを実装
    console.log('予定登録:', {
      siteName,
      date,
      startTime,
      endTime,
      assignee,
      notes,
      contacted,
      siteVisit,
      estimated,
      billed,
      progress,
      startDate,
      completionDate,
      hearingCompleted,
      urgent
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">予定登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="siteName" className="block mb-2 text-sm font-medium text-gray-700">現場名</label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">日程</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-700">開始時間</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-700">終了時間</label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="assignee" className="block mb-2 text-sm font-medium text-gray-700">担当者</label>
            <select
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">選択してください</option>
              {/* TODO: DBから取得した担当者リストを表示 */}
              <option value="user1">担当者1</option>
              <option value="user2">担当者2</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-700">備考</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="contacted"
              checked={contacted}
              onChange={(e) => setContacted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="contacted">連絡済</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="siteVisit"
              checked={siteVisit}
              onChange={(e) => setSiteVisit(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="siteVisit">現調</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="estimated"
              checked={estimated}
              onChange={(e) => setEstimated(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="estimated">見積り済</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="billed"
              checked={billed}
              onChange={(e) => setBilled(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="billed">ご請求済</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="progress"
              checked={progress}
              onChange={(e) => setProgress(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="progress">進捗</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hearingCompleted"
              checked={hearingCompleted}
              onChange={(e) => setHearingCompleted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="hearingCompleted">ヒアリング済み</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="urgent"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="urgent">緊急</label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-700">着工日</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="completionDate" className="block mb-2 text-sm font-medium text-gray-700">完工予定日</label>
            <input
              type="date"
              id="completionDate"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Googleカレンダー</h3>
          <div className="bg-gray-100 p-4 rounded-md overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=suzuki.baudroie%40gmail.com&ctz=Asia%2FTokyo"
              style={{ border: 0 }}
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              title="Google Calendar"
            ></iframe>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          予定を登録
        </button>
      </form>
    </div>
  );
};

export default ScheduleRegistration;