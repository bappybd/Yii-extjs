<?php

/**
 * This is the model class for table "tests".
 *
 * The followings are the available columns in table 'tests':
 * @property integer $id
 * @property string $test_name
 * @property integer $subject
 * @property integer $enabled
 * @property integer $require_login
 * @property integer $passing_score
 * @property string $test_picture
 * @property integer $random
 * @property string $creator
 * @property string $directions
 * @property integer $limit_time
 * @property string $time_limit_h
 * @property string $time_limit_m
 * @property integer $email_instructor
 * @property integer $email_users
 * @property integer $email_template
 * @property integer $report_template
 * @property integer $auto_session
 * @property integer $question_limit
 * @property integer $max_attempts
 * @property integer $allow_quit
 * @property integer $browseable
 * @property integer $alt_email
 */
class Tests extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Tests the static model class
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
		return 'tests';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('subject, enabled, require_login, passing_score, random, limit_time, email_instructor, email_users, email_template, report_template, auto_session, question_limit, max_attempts, allow_quit, browseable, alt_email', 'numerical', 'integerOnly'=>true),
			array('test_name, test_picture, creator', 'length', 'max'=>255),
			array('time_limit_h, time_limit_m', 'length', 'max'=>2),
			array('directions', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, test_name, subject, enabled, require_login, passing_score, test_picture, random, creator, directions, limit_time, time_limit_h, time_limit_m, email_instructor, email_users, email_template, report_template, auto_session, question_limit, max_attempts, allow_quit, browseable, alt_email', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'test_name' => 'Test Name',
			'subject' => 'Subject',
			'enabled' => 'Enabled',
			'require_login' => 'Require Login',
			'passing_score' => 'Passing Score',
			'test_picture' => 'Test Picture',
			'random' => 'Random',
			'creator' => 'Creator',
			'directions' => 'Directions',
			'limit_time' => 'Limit Time',
			'time_limit_h' => 'Time Limit H',
			'time_limit_m' => 'Time Limit M',
			'email_instructor' => 'Email Instructor',
			'email_users' => 'Email Users',
			'email_template' => 'Email Template',
			'report_template' => 'Report Template',
			'auto_session' => 'Auto Session',
			'question_limit' => 'Question Limit',
			'max_attempts' => 'Max Attempts',
			'allow_quit' => 'Allow Quit',
			'browseable' => 'Browseable',
			'alt_email' => 'Alt Email',
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
		$criteria->compare('test_name',$this->test_name,true);
		$criteria->compare('subject',$this->subject);
		$criteria->compare('enabled',$this->enabled);
		$criteria->compare('require_login',$this->require_login);
		$criteria->compare('passing_score',$this->passing_score);
		$criteria->compare('test_picture',$this->test_picture,true);
		$criteria->compare('random',$this->random);
		$criteria->compare('creator',$this->creator,true);
		$criteria->compare('directions',$this->directions,true);
		$criteria->compare('limit_time',$this->limit_time);
		$criteria->compare('time_limit_h',$this->time_limit_h,true);
		$criteria->compare('time_limit_m',$this->time_limit_m,true);
		$criteria->compare('email_instructor',$this->email_instructor);
		$criteria->compare('email_users',$this->email_users);
		$criteria->compare('email_template',$this->email_template);
		$criteria->compare('report_template',$this->report_template);
		$criteria->compare('auto_session',$this->auto_session);
		$criteria->compare('question_limit',$this->question_limit);
		$criteria->compare('max_attempts',$this->max_attempts);
		$criteria->compare('allow_quit',$this->allow_quit);
		$criteria->compare('browseable',$this->browseable);
		$criteria->compare('alt_email',$this->alt_email);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}