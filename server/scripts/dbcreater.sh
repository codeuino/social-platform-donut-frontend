# function to create the collections
createCollection(){
    DB="donut1"
    echo "creating $1 collections"
    PROJECTS=$(mongo "$DB" --eval "db.createCollection('$1')")
    SAMPLE=`grep ok <<< "$PROJECTS"`
    if [[ $SAMPLE == *"\"ok\" : 0"* ]];
    then
        echo "collection already present.. inserting data.."
    else
        echo "creating notification collection n inserting data"
    fi
    DATA=`cat ../db/$2`
    STATUS=$(mongo "$DB" --eval "db.$1.insert(
        [
            ${DATA}
        ]
    )")
    INSERTED=`grep nInserted <<< "$STATUS"`
    VALUE=`sed 's/[^0-9]//g' <<< "$INSERTED"`

    if [ $VALUE -ge 0 ]; then
        echo "$VALUE" records saved in $1
    else
        echo "Something went wrong"
    fi


}

# check whether mongo is installed or not
MONGODB=$(mongo --eval "db.hostInfo()" | grep "ok")
echo "sahib"$MONGODB" singh"

if [[ $MONGODB == *"\"ok\" : 1"* ]];
then
    echo "Mongo found,, continuing creating collections"
    createCollection notifications notifications.txt
    createCollection users users.txt
    createCollection projects projects.txt
else
    echo "Install mongo and then run the shell script"
fi
