import { Migration } from '@mikro-orm/migrations';

export class Migration20230130075252 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" text not null;');
    this.addSql('alter table "user" rename column "title" to "username";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" add column "title" text not null default null;');
    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" drop column "username";');
    this.addSql('alter table "user" drop column "password";');
  }

}
