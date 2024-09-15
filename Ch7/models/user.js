const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    // 첫 번째 인수는 테이블 컬럼 설정, 두 번째 인수는 테이블 자체 설정
    // Sequelize에서 id는 자동으로 PRIMARY KEY로 연결됨
    static initiate(sequelize) {
        User.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    }
};

module.exports = User;