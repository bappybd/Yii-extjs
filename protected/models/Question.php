<?php

/**
 * This is the model class for table "questions".
 *
 * The followings are the available columns in table 'questions':
 * @property integer $id
 * @property string $test_id
 * @property string $question_text
 * @property string $question_pic
 * @property string $pic_mov
 * @property string $pic_mov_width
 * @property string $pic_mov_height
 * @property string $answer1
 * @property string $answer_pic1
 * @property integer $a1
 * @property integer $a1_clicks
 * @property string $answer2
 * @property string $answer_ic2
 * @property integer $a2
 * @property integer $a2_clicks
 * @property string $answer3
 * @property string $answer_pic3
 * @property integer $a3
 * @property integer $a3_clicks
 * @property string $answer4
 * @property string $answerPic4
 * @property integer $a4
 * @property integer $a4_clicks
 * @property string $answer5
 * @property string $answer_pic5
 * @property integer $A5
 * @property integer $A5Clicks
 * @property string $Answer6
 * @property string $AnswerPic6
 * @property integer $a6
 * @property integer $a6_clicks
 * @property string $answer_text
 * @property integer $sort_order
 * @property integer $points
 * @property integer $correct
 * @property integer $incorrect
 * @property string $explanation
 * @property integer $subject_id
 * @property string $answer_aud1
 * @property string $answer_aud2
 * @property string $answer_ud3
 * @property string $answer_aud4
 * @property string $answer_ud5
 * @property string $answer_aud6
 */
class Question extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Question the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'questions';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('a1, a1_clicks, a2, a2_clicks, a3, a3_clicks, a4, a4_clicks, A5, A5Clicks, a6, a6_clicks, sort_order, points, correct, incorrect, subject_id', 'numerical', 'integerOnly'=>true),
			array('test_id, pic_mov_width, pic_mov_height', 'length', 'max'=>50),
			array('question_pic, pic_mov, answer_pic1, answer_ic2, answer_pic3, answerPic4, answer_pic5, AnswerPic6, answer_aud1, answer_aud2, answer_ud3, answer_aud4, answer_ud5, answer_aud6', 'length', 'max'=>255),
			array('question_text, answer1, answer2, answer3, answer4, answer5, Answer6, answer_text, explanation', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, test_id, question_text, question_pic, pic_mov, pic_mov_width, pic_mov_height, answer1, answer_pic1, a1, a1_clicks, answer2, answer_ic2, a2, a2_clicks, answer3, answer_pic3, a3, a3_clicks, answer4, answerPic4, a4, a4_clicks, answer5, answer_pic5, A5, A5Clicks, Answer6, AnswerPic6, a6, a6_clicks, answer_text, sort_order, points, correct, incorrect, explanation, subject_id, answer_aud1, answer_aud2, answer_ud3, answer_aud4, answer_ud5, answer_aud6', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'Test'       => array(self::BELONGS_TO, 'Test', 'test_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'test_id' => 'Test',
			'question_text' => 'Question Text',
			'question_pic' => 'Question Pic',
			'pic_mov' => 'Pic Mov',
			'pic_mov_width' => 'Pic Mov Width',
			'pic_mov_height' => 'Pic Mov Height',
			'answer1' => 'Answer1',
			'answer_pic1' => 'Answer Pic1',
			'a1' => 'A1',
			'a1_clicks' => 'A1 Clicks',
			'answer2' => 'Answer2',
			'answer_ic2' => 'Answer Ic2',
			'a2' => 'A2',
			'a2_clicks' => 'A2 Clicks',
			'answer3' => 'Answer3',
			'answer_pic3' => 'Answer Pic3',
			'a3' => 'A3',
			'a3_clicks' => 'A3 Clicks',
			'answer4' => 'Answer4',
			'answerPic4' => 'Answer Pic4',
			'a4' => 'A4',
			'a4_clicks' => 'A4 Clicks',
			'answer5' => 'Answer5',
			'answer_pic5' => 'Answer Pic5',
			'A5' => 'A5',
			'A5Clicks' => 'A5 Clicks',
			'Answer6' => 'Answer6',
			'AnswerPic6' => 'Answer Pic6',
			'a6' => 'A6',
			'a6_clicks' => 'A6 Clicks',
			'answer_text' => 'Answer Text',
			'sort_order' => 'Sort Order',
			'points' => 'Points',
			'correct' => 'Correct',
			'incorrect' => 'Incorrect',
			'explanation' => 'Explanation',
			'subject_id' => 'Subject',
			'answer_aud1' => 'Answer Aud1',
			'answer_aud2' => 'Answer Aud2',
			'answer_ud3' => 'Answer Ud3',
			'answer_aud4' => 'Answer Aud4',
			'answer_ud5' => 'Answer Ud5',
			'answer_aud6' => 'Answer Aud6',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('test_id',$this->test_id,true);
		$criteria->compare('question_text',$this->question_text,true);
		$criteria->compare('question_pic',$this->question_pic,true);
		$criteria->compare('pic_mov',$this->pic_mov,true);
		$criteria->compare('pic_mov_width',$this->pic_mov_width,true);
		$criteria->compare('pic_mov_height',$this->pic_mov_height,true);
		$criteria->compare('answer1',$this->answer1,true);
		$criteria->compare('answer_pic1',$this->answer_pic1,true);
		$criteria->compare('a1',$this->a1);
		$criteria->compare('a1_clicks',$this->a1_clicks);
		$criteria->compare('answer2',$this->answer2,true);
		$criteria->compare('answer_ic2',$this->answer_ic2,true);
		$criteria->compare('a2',$this->a2);
		$criteria->compare('a2_clicks',$this->a2_clicks);
		$criteria->compare('answer3',$this->answer3,true);
		$criteria->compare('answer_pic3',$this->answer_pic3,true);
		$criteria->compare('a3',$this->a3);
		$criteria->compare('a3_clicks',$this->a3_clicks);
		$criteria->compare('answer4',$this->answer4,true);
		$criteria->compare('answerPic4',$this->answerPic4,true);
		$criteria->compare('a4',$this->a4);
		$criteria->compare('a4_clicks',$this->a4_clicks);
		$criteria->compare('answer5',$this->answer5,true);
		$criteria->compare('answer_pic5',$this->answer_pic5,true);
		$criteria->compare('A5',$this->A5);
		$criteria->compare('A5Clicks',$this->A5Clicks);
		$criteria->compare('Answer6',$this->Answer6,true);
		$criteria->compare('AnswerPic6',$this->AnswerPic6,true);
		$criteria->compare('a6',$this->a6);
		$criteria->compare('a6_clicks',$this->a6_clicks);
		$criteria->compare('answer_text',$this->answer_text,true);
		$criteria->compare('sort_order',$this->sort_order);
		$criteria->compare('points',$this->points);
		$criteria->compare('correct',$this->correct);
		$criteria->compare('incorrect',$this->incorrect);
		$criteria->compare('explanation',$this->explanation,true);
		$criteria->compare('subject_id',$this->subject_id);
		$criteria->compare('answer_aud1',$this->answer_aud1,true);
		$criteria->compare('answer_aud2',$this->answer_aud2,true);
		$criteria->compare('answer_ud3',$this->answer_ud3,true);
		$criteria->compare('answer_aud4',$this->answer_aud4,true);
		$criteria->compare('answer_ud5',$this->answer_ud5,true);
		$criteria->compare('answer_aud6',$this->answer_aud6,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}